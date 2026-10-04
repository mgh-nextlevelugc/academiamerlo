import { AudienceTabs } from "./AudienceTabs";

export function AudienceSection() {
  return (
    <section className="section">
      <div className="wrap audience">
        <div>
          <span className="label red">Tu lugar en el mercado</span>
          <h2>Para quienes quieren ir más allá del rumor.</h2>
        </div>
        <AudienceTabs />
      </div>
    </section>
  );
}
