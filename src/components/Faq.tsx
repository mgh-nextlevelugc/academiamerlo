type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="faq">
          <span className="label red">Antes de dar el paso</span>
          <h2>Las preguntas que importan.</h2>
          {items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
