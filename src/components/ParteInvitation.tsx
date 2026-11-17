import Link from "next/link";
import { parteContent } from "@/lib/content";
import { PARTE_LIVE } from "@/lib/site-config";

export function ParteInvitation({
  afterWaitlist = false,
}: {
  afterWaitlist?: boolean;
}) {
  if (!PARTE_LIVE) return null;
  return (
    <aside className="commerce-invitation" data-parte-invitation>
      <span className="label">{parteContent.label}</span>
      <h2>{parteContent.name}</h2>
      <p>
        {afterWaitlist ? parteContent.waitlistInvitation : parteContent.tagline}
      </p>
      <Link className="text-link" href="/parte">
        {parteContent.discoverCta} <span aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
