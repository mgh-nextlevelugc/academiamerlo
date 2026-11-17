"use client";

import { useState } from "react";
import { pricingPlans, pricingContent, parteContent } from "@/lib/content";
import { HOTMART_CHECKOUT } from "@/lib/site-config";
import { ParteOffer } from "./ParteOffer";

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
      <p>{pricingContent.billing}</p>
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
          onClick={() => setPendingMessage(pricingContent.pending(plan.name))}
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
          <span className="label red">{pricingContent.label}</span>
          <h2>{pricingContent.title}</h2>
          <p>{pricingContent.description}</p>
        </div>
        <div className="pricing pricing-unified">
          <article className="plan plan-parte">
            <span className="label">{parteContent.tierLabel}</span>
            <h3>{parteContent.name}</h3>
            <p>{parteContent.label}</p>
            <ParteOffer />
            <ul>
              {parteContent.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
          {pricingPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <p className="guarantee">
          <strong>{pricingContent.guidanceTitle}</strong>{" "}
          {pricingContent.guidance}
        </p>
        <p className="guarantee">{pricingContent.guarantee}</p>
        <p className="guarantee">{pricingContent.payments}</p>
      </div>
    </section>
  );
}
