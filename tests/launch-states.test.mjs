import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createSourceLoader } from "./helpers/load-source.mjs";

const checkout = {
  NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD:
    "https://pay.hotmart.com/K105579077Y?off=ck9jh14u",
  NEXT_PUBLIC_HOTMART_CHECKOUT_VIP:
    "https://pay.hotmart.com/K105579077Y?off=924zdazg",
  NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE: "https://pay.hotmart.com/W108525490P",
};
const render = (Component, props = {}) =>
  renderToStaticMarkup(React.createElement(Component, props));

for (const phase of ["waitlist", "launch"]) {
  for (const live of ["off", "on"]) {
    test(`${phase}/${live}: checkout, navigation, invitations and SEO follow independent flags`, () => {
      const env = {
        ...checkout,
        NEXT_PUBLIC_SITE_URL: "https://academiamerlo.com",
        NEXT_PUBLIC_PHASE: phase,
        NEXT_PUBLIC_PARTE_LIVE: live,
      };
      const load = createSourceLoader(env);
      const content = load("src/lib/content").parteContent;
      const pricing = render(load("src/components/Pricing").Pricing);
      assert.equal(
        pricing.includes(checkout.NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE),
        live === "on",
      );
      assert.ok(
        pricing.includes(checkout.NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD),
      );
      assert.ok(pricing.includes(checkout.NEXT_PUBLIC_HOTMART_CHECKOUT_VIP));
      assert.ok(
        pricing.indexOf("<h3>VIP") < pricing.indexOf(content.name),
      );
      assert.ok(pricing.indexOf("<h3>Standard") < pricing.indexOf("<h3>VIP"));
      assert.equal(pricing.includes(content.comingSoon), live === "off");

      for (const file of [
        "src/app/parte/page",
        "src/app/parte/gracias/page",
        "src/app/gracias/page",
      ]) {
        const page = load(file);
        const html = render(page.default);
        const isThanks = file.includes("gracias");
        assert.equal(
          html.includes(checkout.NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE),
          live === "on" && !isThanks,
        );
        if (isThanks) {
          assert.equal(page.metadata.robots.index, false);
          assert.equal(page.metadata.robots.follow, false);
        } else {
          assert.equal(page.metadata.title, content.name);
          assert.equal(
            page.metadata.robots?.index,
            phase === "launch" && live === "on" ? undefined : false,
          );
          assert.equal(page.metadata.openGraph.locale, "es_MX");
          assert.equal(page.metadata.openGraph.siteName, "Academia Merlo");
          assert.equal(page.metadata.openGraph.type, "website");
          assert.equal(page.metadata.twitter.card, "summary_large_image");
          assert.equal(page.metadata.twitter.images[0].url, "/parte/opengraph-image");
          assert.equal(html.includes(content.comingSoon), live === "off");
          assert.ok(html.includes(content.steps[1]));
          assert.ok(html.includes("72 horas"));
        }
        if (file.includes("parte/gracias")) {
          for (const metadata of [page.metadata, page.metadata.openGraph, page.metadata.twitter]) {
            assert.equal(metadata.description, content.thanks.description);
          }
          assert.ok(html.includes(content.thanks.access(72)));
          assert.equal(
            html.includes("data-academy-invitation"),
            phase === "launch",
          );
          assert.equal(html.includes('href="/#planes"'), phase === "launch");
          assert.ok(html.includes(`mailto:${content.supportEmail}`));
        }
        if (file === "src/app/gracias/page")
          assert.equal(html.includes("data-parte-invitation"), live === "on");
      }
      for (const [file, name] of [
        ["Nav", "Nav"],
        ["Footer", "Footer"],
      ]) {
        const html = render(load(`src/components/${file}`)[name], {
          mode: phase === "launch" ? "venta" : "waitlist",
        });
        assert.equal(html.includes('href="/parte"'), live === "on");
      }
      const urls = load("src/app/sitemap")
        .default()
        .map((entry) => entry.url);
      assert.ok(urls.every((url) => !url.includes("gracias")));
      assert.ok(urls.includes(env.NEXT_PUBLIC_SITE_URL));
      assert.equal(urls.includes(`${env.NEXT_PUBLIC_SITE_URL}/parte`), phase === "launch" && live === "on");
      assert.ok(!urls.includes(`${env.NEXT_PUBLIC_SITE_URL}/inscripciones`));
      const robots = load("src/app/robots").default();
      assert.equal(robots.rules.length, 1);
      assert.equal(robots.rules[0].userAgent, "*");
      assert.equal(robots.rules[0].allow, "/");

      for (const file of ["src/app/page", "src/app/inscripciones/page", "src/app/lista/page"]) {
        const page = load(file);
        const html = render(page.default);
        const sales = file.includes("inscripciones") || (file === "src/app/page" && phase === "launch");
        assert.equal(html.includes('id="planes"'), sales);
        assert.equal(html.includes(checkout.NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD), sales);
        assert.ok(html.includes("módulo a módulo"));
        assert.ok(html.includes("a partir del día 8 desde tu compra"));
        if (file.includes("inscripciones")) {
          assert.equal(page.metadata.robots?.index, phase === "waitlist" ? false : undefined);
          assert.equal(page.metadata.alternates?.canonical, phase === "launch" ? "/" : undefined);
        }
      }

      for (const submitted of [false, true]) {
        const register = createSourceLoader(env, {
          "@/hooks/useTallyEmbed": {
            useTallyEmbed: () => ({
              configured: true,
              submitted,
              slotRef: null,
              frameHostRef: null,
              status: "",
              fallbackHref: null,
            }),
          },
        });
        const html = render(register("src/components/Register").Register);
        assert.equal(
          html.includes("data-parte-invitation"),
          submitted && live === "on",
        );
        assert.equal(
          html.includes(content.waitlistInvitation),
          submitted && live === "on",
        );
      }
      for (const file of ["src/app/privacidad/page", "src/app/terminos/page"]) {
        const html = render(load(file).default);
        assert.ok(html.includes(`href="/${phase === "launch" ? "#planes" : "#lista"}"`));
        // Los cambios legales siguen pendientes de aprobación, no se publican.
        assert.ok(html.includes("admin@roikon.com"));
      }
    });
  }
}

test("missing or unknown flag defaults to off; missing checkout never produces an empty purchase link", () => {
  for (const flag of [undefined, "", "yes", "ON"]) {
    const load = createSourceLoader({
      ...checkout,
      NEXT_PUBLIC_PARTE_LIVE: flag,
    });
    const html = render(load("src/components/ParteOffer").ParteOffer);
    assert.ok(!html.includes("pay.hotmart.com"));
    assert.ok(!html.includes('href=""'));
  }
  for (const missing of [undefined, "", "  "]) {
    const load = createSourceLoader({
      NEXT_PUBLIC_PARTE_LIVE: "on",
      NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE: missing,
    });
    const html = render(load("src/components/ParteOffer").ParteOffer);
    assert.ok(!html.includes("<a"));
    assert.ok(html.includes(load("src/lib/content").parteContent.comingSoon));
    assert.ok(!html.includes('class="btn'));
    assert.ok(!html.includes("<button"));
    const pricing = render(load("src/components/Pricing").Pricing);
    assert.ok(!pricing.includes("<button"));
    assert.ok(!pricing.includes('class="btn'));
    assert.ok(!pricing.includes("pay.hotmart.com"));
    assert.equal((pricing.match(/Próximamente/g) ?? []).length, 3);
  }
});

test("missing academy checkout hides only that plan's purchase action", () => {
  for (const [missing, available] of [["STANDARD", "VIP"], ["VIP", "STANDARD"]]) {
    const load = createSourceLoader({
      ...checkout,
      [`NEXT_PUBLIC_HOTMART_CHECKOUT_${missing}`]: "  ",
      NEXT_PUBLIC_PARTE_LIVE: "off",
    });
    const html = render(load("src/components/Pricing").Pricing);
    assert.ok(!html.includes(checkout[`NEXT_PUBLIC_HOTMART_CHECKOUT_${missing}`]));
    assert.ok(html.includes(checkout[`NEXT_PUBLIC_HOTMART_CHECKOUT_${available}`]));
    assert.ok(!html.includes("<button"));
    assert.equal((html.match(/Próximamente/g) ?? []).length, 2);
  }
});

test("build warns by variable name about each missing checkout without logging values", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--input-type=module",
      "-e",
      `import config from './next.config.mjs'; config('phase-production-build');`,
    ],
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        NEXT_PUBLIC_HOTMART_CHECKOUT_STANDARD: "",
        NEXT_PUBLIC_HOTMART_CHECKOUT_VIP: "",
        NEXT_PUBLIC_HOTMART_CHECKOUT_PARTE: "",
      },
      encoding: "utf8",
    },
  );
  assert.equal(result.status, 0, result.stderr);
  for (const key of Object.keys(checkout))
    assert.ok(result.stderr.includes(key));
  assert.ok(!result.stderr.includes("pay.hotmart.com"));
});

test("community identity is declared once and all new commerce copy uses clean punctuation", () => {
  const load = createSourceLoader();
  const content = load("src/lib/content");
  const source = readFileSync(
    new URL("../src/lib/content.ts", import.meta.url),
    "utf8",
  );
  assert.equal(source.split(content.parteContent.name).length - 1, 1);
  for (const block of [
    content.parteContent,
    content.academyThanksContent,
    content.commerceContent,
    content.pricingContent,
  ]) {
    assert.ok(
      !/[\u2014]|\b(vos|tenés|querés|podés|sos)\b|Mercado Pago/i.test(
        JSON.stringify(block),
      ),
    );
  }
});
