"use client";

import { useState } from "react";
import { pricingPlans } from "@/lib/content";
import { HOTMART_CHECKOUT } from "@/lib/site-config";

function PlanCard({ plan }: { plan: (typeof pricingPlans)[number] }) {
  const checkoutUrl = HOTMART_CHECKOUT[plan.id];
  const [pendingMessage, setPendingMessage] = useState("");

  return (
    <article className={`plan${plan.vip ? " vip" : ""}`}>
      <span className="label">{plan.label}</span>
      <h3>{plan.name}</h3>
      <div className="price">
        <small>US$</small> {plan.price}
      </div>
      <p>Pago único · acceso de por vida</p>
      <ul>
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      {checkoutUrl ? (
        <a
          className={`btn${plan.id === "standard" ? " btn-ink" : ""}`}
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {plan.cta} <small aria-hidden="true">↗</small>
        </a>
      ) : (
        <button
          className={`btn${plan.id === "standard" ? " btn-ink" : ""}`}
          type="button"
          data-checkout={plan.name}
          onClick={() =>
            setPendingMessage(
              `Vista de prueba: aquí se abrirá el checkout de Hotmart del plan ${plan.name}. El enlace definitivo está pendiente.`,
            )
          }
        >
          {plan.cta} <small aria-hidden="true">↗</small>
        </button>
      )}
      <div className="status" role="status">
        {pendingMessage}
      </div>
    </article>
  );
}

export function Pricing() {
  return (
    <section className="section rule" id="planes">
      <div className="wrap">
        <div className="section-head">
          <span className="label red">Elige cómo quieres aprender</span>
          <h2>El mismo método. Dos formas de vivirlo.</h2>
          <p>Estudia a tu ritmo con Standard o suma encuentros en vivo y feedback de César con VIP.</p>
        </div>
        <div className="pricing">
          {pricingPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="guarantee">
          <strong>¿No sabes cuál elegir?</strong> Standard es el método completo. VIP es el
          método con César revisando tu trabajo.
        </p>
        <p className="guarantee">Pago a través de Hotmart · Garantía de devolución de 7 días</p>
        <p className="guarantee">
          Los medios de pago y las cuotas disponibles se mostrarán en el checkout.
        </p>
      </div>
    </section>
  );
}
