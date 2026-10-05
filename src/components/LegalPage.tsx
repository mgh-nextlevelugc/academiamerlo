import { Nav } from "./Nav";
import { Footer } from "./Footer";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <a className="skip" href="#contenido">
        Ir al contenido
      </a>
      <Nav mode="waitlist" anchorPrefix="/" />
      <main id="contenido">
        <section className="section legal">
          <div className="wrap">
            <h1>{title}</h1>
            <p className="legal-updated">{lastUpdated}</p>
            {intro && <p className="legal-intro">{intro}</p>}
            {sections.map((section) => (
              <section key={section.heading} className="legal-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
