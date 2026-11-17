import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { createSourceLoader } from "./helpers/load-source.mjs";

const content = createSourceLoader()("src/lib/content.ts");
const importContent = () => content;

const source = readFileSync(new URL("../src/lib/meta-pixel.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
}).outputText;

function browser(initialUrl = "/gracias?email=private@example.test#buyer") {
  let url = initialUrl;
  const scripts = [];
  const historyState = { __NA: true, tree: ["existing-next-state"] };
  const window = {
    history: {
      state: historyState,
      replaceState(state, _, path) {
        assert.equal(state, historyState, "Must preserve Next history state");
        url = path;
      },
    },
  };
  // Fail if the implementation tries to inspect query parameters or a hash.
  Object.defineProperty(window, "location", {
    get() { throw new Error("Do not inspect buyer URL data"); },
  });
  const document = {
    getElementById: (id) => scripts.find((script) => script.id === id),
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push({ ...script, urlAtLoad: url }) },
  };
  const exports = {};
  vm.runInNewContext(compiled, { exports, window, document, require: importContent });
  return {
    track: exports.trackMetaPage,
    scripts,
    window,
    url: () => url,
    events: () => JSON.parse(JSON.stringify(window.fbq?.queue ?? []))
      .filter((call) => call[0] === "trackSingle"),
  };
}

test("empty or invalid ID is a no-op, including URL and script loading", () => {
  const b = browser();
  b.track("", "/gracias");
  b.track("not-an-id", "/parte/gracias");
  assert.equal(b.window.fbq, undefined);
  assert.equal(b.scripts.length, 0);
  assert.equal(b.url(), "/gracias?email=private@example.test#buyer");
});

test("SSR never accesses browser globals", () => {
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: importContent });
  assert.doesNotThrow(() => exports.trackMetaPage("12345", "/gracias"));
});

test("thank-you URL is cleaned before loading Pixel; remounts do not duplicate events", () => {
  const b = browser();
  b.track("12345", "/gracias");
  b.track("12345", "/gracias");
  assert.equal(b.url(), "/gracias");
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].urlAtLoad, "/gracias");
  assert.equal(b.scripts[0].referrerPolicy, "no-referrer");
  assert.deepEqual(b.events().map((call) => call[2]), ["PageView", "Purchase"]);
  assert.ok(!JSON.stringify(b.events()).includes("private@example.test"));
});

test("SPA navigation tracks PageViews but does not repeat a Purchase in the same document", () => {
  const b = browser("/parte");
  for (const path of ["/parte", "/gracias", "/", "/gracias", "/parte/gracias", "/parte/gracias"])
    b.track("12345", path);
  assert.equal(b.events().filter((call) => call[2] === "PageView").length, 5);
  assert.equal(b.events().filter((call) => call[2] === "Purchase").length, 2);
  assert.equal(b.scripts.length, 1);
});

test("ordinary pages do not produce purchases or discard campaign parameters", () => {
  const b = browser("/?utm_source=campaign&ref=partner");
  for (const path of ["/", "/inscripciones", "/parte", "/privacidad", "/gracias/otra"])
    b.track("12345", path);
  assert.equal(b.events().filter((call) => call[2] === "Purchase").length, 0);
  assert.equal(b.url(), "/?utm_source=campaign&ref=partner");
});

test("shared academy URL does not invent a plan price; Parte identifies its product", () => {
  const b = browser();
  b.track("12345", "/gracias");
  b.track("12345", "/parte/gracias");
  const purchases = b.events().filter((call) => call[2] === "Purchase");
  assert.deepEqual(purchases[0][3].content_ids, ["7636264"]);
  assert.equal(purchases[0][3].value, undefined);
  assert.deepEqual(purchases[1][3].content_ids, ["8990968"]);
  assert.equal(purchases[1][3].content_name, content.parteContent.name);
  assert.equal(purchases[1][3].value, 5.99);
  assert.equal(purchases[1][3].currency, "USD");
});

test("events wait in the queue while the SDK loads, then dispatch to the ready SDK", () => {
  const b = browser("/");
  b.track("12345", "/");
  const delivered = [...b.window.fbq.queue];
  b.window.fbq.queue.length = 0;
  b.window.fbq.callMethod = (...args) => delivered.push(args);
  b.track("12345", "/parte/gracias");
  b.track("12345", "/parte/gracias");
  assert.equal(delivered.filter((call) => call[2] === "Purchase").length, 1);
  assert.equal(b.window.fbq.queue.length, 0);
});

test("a fresh document load can produce a new Purchase", () => {
  for (let load = 0; load < 2; load++) {
    const b = browser();
    b.track("12345", "/gracias");
    assert.equal(b.events().filter((call) => call[2] === "Purchase").length, 1);
  }
});
