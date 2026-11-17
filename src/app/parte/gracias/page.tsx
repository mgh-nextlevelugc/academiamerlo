import type { Metadata } from "next";
import Link from "next/link";
import { CommerceShell } from "@/components/CommerceShell";
import { ParteSupport } from "@/components/ParteSupport";
import { parteContent } from "@/lib/content";
import { PARTE_ACCESS_MAX_HOURS, SITE_PHASE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: parteContent.thanks.title(parteContent.name),
  description: parteContent.thanks.description,
  alternates: { canonical: "/parte/gracias" },
  robots: { index: false, follow: false },
};

export default function ParteGraciasPage() {
  return (
    <CommerceShell>
      <section
        className="commerce-thanks parte-thanks"
        aria-labelledby="parte-gracias-title"
      >
        <span className="label commerce-label">{parteContent.label}</span>
        <h1 id="parte-gracias-title">
          {parteContent.thanks.heading(parteContent.name)}
        </h1>
        <div className="commerce-access-note">
          <p>{parteContent.thanks.access(PARTE_ACCESS_MAX_HOURS)}</p>
        </div>
        <ParteSupport />
        <p className="commerce-note">{parteContent.thanks.cancellation}</p>
        <a className="btn commerce-button" href="https://consumer.hotmart.com">
          {parteContent.thanks.cta} <span aria-hidden="true">↗</span>
        </a>
        {SITE_PHASE === "launch" && (
          <aside className="commerce-invitation" data-academy-invitation>
            <h2>{parteContent.academyInvitation}</h2>
            <Link className="text-link" href="/#planes">
              {parteContent.academyCta} <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        )}
      </section>
    </CommerceShell>
  );
}
