import { parteContent } from "@/lib/content";
import { HOTMART_CHECKOUT, PARTE_LIVE } from "@/lib/site-config";

/** Una única compuerta para precio y checkout, en la landing y en /parte. */
export function ParteOffer() {
  if (!PARTE_LIVE) {
    return (
      <div className="parte-availability" data-parte-state="off">
        <p className="parte-coming-soon">
          <span aria-hidden="true" />
          {parteContent.comingSoon}
        </p>
        <p>{parteContent.billing}</p>
      </div>
    );
  }

  return (
    <div className="parte-offer" data-parte-state="on">
      <p className="parte-offer-price">
        <span>{parteContent.currency}</span> {parteContent.price}{" "}
        <small>{parteContent.period}</small>
      </p>
      {HOTMART_CHECKOUT.parte ? (
        <a
          className="btn commerce-button"
          href={HOTMART_CHECKOUT.parte}
          target="_blank"
          rel="noopener noreferrer"
        >
          {parteContent.cta} <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="commerce-checkout-pending">
          {parteContent.checkoutPending}
        </p>
      )}
      <p className="parte-currency-note">{parteContent.localCurrency}</p>
    </div>
  );
}
