type PixelArguments = [command: string, ...parameters: unknown[]];
type PixelFunction = {
  (...args: PixelArguments): void;
  callMethod?: (...args: PixelArguments) => void;
  queue: PixelArguments[];
  push?: PixelFunction;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: PixelFunction;
    _fbq?: PixelFunction;
  }
}

let initialized = false;
let lastPageView: string | undefined;
const purchases = new Set<string>();

function initializePixel(pixelId: string): PixelFunction {
  if (!window.fbq) {
    const queue: PixelFunction = (...args) => {
      if (queue.callMethod) queue.callMethod(...args);
      else queue.queue.push(args);
    };
    queue.queue = [];
    queue.push = queue;
    queue.loaded = true;
    queue.version = "2.0";
    window.fbq = queue;
    window._fbq ??= queue;
  }

  if (!initialized) {
    // Sin matching avanzado ni detección automática de eventos/formularios.
    window.fbq("set", "autoConfig", false, pixelId);
    window.fbq("init", pixelId);
    initialized = true;
    if (!document.getElementById("merlo-meta-pixel")) {
      const script = document.createElement("script");
      script.id = "merlo-meta-pixel";
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.referrerPolicy = "no-referrer";
      document.head.appendChild(script);
    }
  }

  return window.fbq;
}

export function trackMetaPage(pixelId: string, pathname: string): void {
  if (!/^\d+$/.test(pixelId) || typeof window === "undefined") return;

  const isAcademy = pathname === "/gracias";
  const isParte = pathname === "/parte/gracias";
  if (isAcademy || isParte) {
    // Hotmart puede añadir datos de comprador al redirect. Eliminamos toda
    // query y hash sin leer sus valores, antes de cargar o invocar el Pixel.
    // Conservar el estado interno de Next para no romper la navegación.
    window.history.replaceState(window.history.state, "", pathname);
  }

  const pixel = initializePixel(pixelId);
  if (lastPageView !== pathname) {
    pixel("trackSingle", pixelId, "PageView");
    lastPageView = pathname;
  }

  if ((isAcademy || isParte) && !purchases.has(pathname)) {
    const product = isAcademy
      ? { content_ids: ["7636264"], content_type: "product", content_name: "Academia Merlo" }
      : { content_ids: ["8990968"], content_type: "product", content_name: "El Parte de Merlo", value: 5.99, currency: "USD" };
    // La academia comparte URL entre Standard y VIP: no inventar el importe.
    // El Set dura esta carga del documento, no persiste entre recargas.
    pixel("trackSingle", pixelId, "Purchase", product);
    purchases.add(pathname);
  }
}
