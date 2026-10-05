import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { EditorialTicker } from "./EditorialTicker";
import { Journey } from "./Journey";
import { Mentor } from "./Mentor";
import { MediaRails } from "./MediaRails";
import { AudienceSection } from "./AudienceSection";
import { Register } from "./Register";
import { Materials } from "./Materials";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { MobileCta } from "./MobileCta";
import { faqWaitlist, faqVenta } from "@/lib/content";
import type { PageMode } from "@/lib/site-config";

export function AcademiaMerloPage({ mode }: { mode: PageMode }) {
  return (
    <>
      <a className="skip" href="#contenido">
        Ir al contenido
      </a>
      <Nav mode={mode} />
      <main id="contenido">
        <Hero mode={mode} />
        <EditorialTicker />
        <Journey mode={mode} />
        <Mentor />
        <MediaRails />
        <AudienceSection />
        {mode === "waitlist" ? (
          <Register />
        ) : (
          <>
            <Materials />
            <Pricing />
          </>
        )}
        <Faq items={mode === "waitlist" ? faqWaitlist : faqVenta} />
      </main>
      <Footer />
      <MobileCta mode={mode} />
    </>
  );
}
