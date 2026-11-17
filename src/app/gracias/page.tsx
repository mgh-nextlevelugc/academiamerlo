import type { Metadata } from "next";
import { CommerceShell } from "@/components/CommerceShell";
import { ParteInvitation } from "@/components/ParteInvitation";
import { academyThanksContent as content } from "@/lib/content";

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
  alternates: { canonical: "/gracias" },
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return (
    <CommerceShell>
      <section className="commerce-thanks" aria-labelledby="gracias-title">
        <span className="label commerce-label">{content.label}</span>
        <h1 id="gracias-title">{content.heading}</h1>
        <ol className="commerce-steps academy-next-steps" role="list">
          {content.steps.map((step) => (
            <li key={step.title}>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="commerce-note">{content.note}</p>
        <a className="btn commerce-button" href="https://consumer.hotmart.com">
          {content.cta} <span aria-hidden="true">↗</span>
        </a>
        <ParteInvitation />
      </section>
    </CommerceShell>
  );
}
