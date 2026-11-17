import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import React from "react";

const root = path.resolve(import.meta.dirname, "../..");
const require = createRequire(import.meta.url);

// Loads the real TS/TSX modules with an isolated build-time env per scenario.
// Next's image/link optimizers are irrelevant to SSR visibility assertions.
export function createSourceLoader(env = {}, overrides = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file);
    if (!existsSync(file)) file += existsSync(`${file}.tsx`) ? ".tsx" : ".ts";
    if (cache.has(file)) return cache.get(file).exports;
    const loadedModule = { exports: {} };
    cache.set(file, loadedModule);
    const compiled = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    }).outputText;
    const importModule = (id) => {
      if (Object.hasOwn(overrides, id)) return overrides[id];
      if (id === "next/link")
        return function Link({ children, ...props }) {
          return React.createElement("a", props, children);
        };
      if (id === "next/image")
        return function Image({ alt, src, width, height }) {
          return React.createElement("img", { alt, src, width, height });
        };
      if (id.startsWith("@/")) return load(`src/${id.slice(2)}`);
      if (id.startsWith(".")) return load(path.resolve(path.dirname(file), id));
      return require(id);
    };
    vm.runInNewContext(
      compiled,
      {
        module: loadedModule,
        exports: loadedModule.exports,
        require: importModule,
        process: { env },
        console,
      },
      { filename: file },
    );
    return loadedModule.exports;
  }
  return load;
}
