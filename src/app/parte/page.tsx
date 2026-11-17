import type { Metadata } from "next";
import Image from "next/image";
import { CommerceShell } from "@/components/CommerceShell";
import { ParteOffer } from "@/components/ParteOffer";
import { ParteSupport } from "@/components/ParteSupport";
import { parteContent } from "@/lib/content";
import { PARTE_ACCESS_MAX_HOURS, SITE_PHASE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: parteContent.name,
  description: parteContent.description,
  alternates: { canonical: "/parte" },
  robots:
    SITE_PHASE === "waitlist" ? { index: false, follow: false } : undefined,
  openGraph: {
    title: parteContent.name,
    description: parteContent.tagline,
    url: "/parte",
  },
  twitter: { title: parteContent.name, description: parteContent.tagline },
};

export default function PartePage() {
  return (
    <CommerceShell>
      <div className="parte-grid">
        <section className="parte-intro" aria-labelledby="parte-title">
          <div className="parte-masthead">
            <Image
              src={parteContent.logo}
              alt=""
              width={96}
              height={56}
              className="parte-logo"
            />
            <span className="label commerce-label">{parteContent.label}</span>
          </div>
          <h1 id="parte-title">{parteContent.name}</h1>
          <p className="commerce-description">{parteContent.tagline}</p>
        </section>
        <section
          className="parte-subscription"
          aria-label={parteContent.billing}
        >
          <span className="label">{parteContent.tierLabel}</span>
          <ParteOffer />
        </section>
        <section
          className="parte-details"
          aria-labelledby="parte-benefits-title"
        >
          <h2 id="parte-benefits-title">{parteContent.benefitsTitle}</h2>
          <ul className="parte-benefits" role="list">
            {parteContent.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="parte-publishing">{parteContent.publishing}</p>
        </section>
        <section className="parte-how" aria-labelledby="parte-how-title">
          <h2 id="parte-how-title">{parteContent.howTitle}</h2>
          <ol className="commerce-steps parte-steps" role="list">
            {parteContent.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
            <li>{parteContent.accessStep(PARTE_ACCESS_MAX_HOURS)}</li>
          </ol>
          <ParteSupport />
        </section>
      </div>
    </CommerceShell>
  );
}
