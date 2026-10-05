import Image from "next/image";
import { audienceNumbers, audienceSource } from "@/lib/content";
import { CountUp } from "./CountUp";

export function Mentor() {
  return (
    <section className="section mentor-section" id="cesar">
      <div className="wrap">
        <div className="mentor-profile">
          <figure className="mentor-portrait">
            <Image
              src="/cesar-merlo-uol.jpg"
              alt="César Luis Merlo hablando por teléfono"
              width={2773}
              height={3697}
            />
            <figcaption>
              César Luis Merlo <span>Periodista especializado en mercado de pases</span>
            </figcaption>
          </figure>
          <div className="mentor-story">
            <span className="label red">Aprende con César</span>
            <h2>César Luis Merlo. La información como oficio.</h2>
            <div className="mentor-copy">
              <p>
                Su trabajo sigue las negociaciones, los protagonistas y las decisiones que
                mueven el fútbol. Ahora, esa experiencia toma forma de programa.
              </p>
              <p>
                Aprende cómo aborda las fuentes, contrasta versiones y decide cuándo una
                información está lista para publicarse.
              </p>
              <p className="lema">«La noticia no se mancha.»</p>
              <a
                className="text-link"
                href="https://linktr.ee/clmerlo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conoce sus canales
              </a>
            </div>
          </div>
        </div>
        <div className="audience-numbers">
          <span className="label">Una audiencia que sigue su trabajo</span>
          <div className="stats">
            {audienceNumbers.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>
                  <CountUp value={stat.numericValue} suffix={stat.suffix} label={stat.label} />
                </strong>
                <span>
                  {stat.captionLines[0]}
                  <br />
                  {stat.captionLines[1]}
                </span>
              </div>
            ))}
          </div>
          <p className="source">{audienceSource}</p>
        </div>
      </div>
    </section>
  );
}
