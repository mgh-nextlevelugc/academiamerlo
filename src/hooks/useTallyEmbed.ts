"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Coinciden con los hidden fields del form aQ8N92. "ref" va aparte de los
// utm_* porque el form lo captura como campo propio.
const PASSTHROUGH_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
];

declare global {
  interface Window {
    Tally?: { loadEmbeds?: () => void };
  }
}

/**
 * Puerto 1:1 del adaptador de Tally en merlo-v3.4/waitlist.html (script v2.2):
 * monta el iframe solo cuando el slot entra en viewport (o cuando el hero
 * dispara "continuar"), arma la URL de embed con alignLeft/hideTitle/
 * transparentBackground/dynamicHeight + prefill de email + passthrough de
 * UTMs, escucha postMessage (Tally.FormLoaded/FormSubmitted) y nunca
 * reemplaza un iframe donde la persona ya empezó a escribir.
 */
export function useTallyEmbed(formId: string) {
  const configured = /^[A-Za-z0-9]+$/.test(formId);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const frameHostRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const frameTouchedRef = useRef(false);
  const widgetPromiseRef = useRef<Promise<void> | null>(null);
  const loadTimerRef = useRef<number | undefined>(undefined);

  const [status, setStatus] = useState(configured ? "El formulario se cargará en este espacio." : "");
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const formURL = useCallback(
    (embed: boolean, email = "") => {
      const url = new URL(`https://tally.so/${embed ? "embed/" : "r/"}${formId}`);
      if (embed) {
        Object.entries({
          alignLeft: 1,
          hideTitle: 1,
          transparentBackground: 1,
          dynamicHeight: 1,
        }).forEach(([k, v]) => url.searchParams.set(k, String(v)));
      }
      if (email) url.searchParams.set("email", email);
      if (typeof window !== "undefined") {
        const query = new URLSearchParams(window.location.search);
        PASSTHROUGH_KEYS.forEach((key) => {
          if (query.has(key)) url.searchParams.set(key, query.get(key)!);
        });
      }
      return url;
    },
    [formId],
  );

  const loadWidget = useCallback(() => {
    if (window.Tally?.loadEmbeds) return Promise.resolve();
    if (!widgetPromiseRef.current) {
      widgetPromiseRef.current = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("widget-unavailable"));
        document.head.append(script);
      });
    }
    return widgetPromiseRef.current;
  }, []);

  const mount = useCallback(
    (email: string) => {
      if (!configured) return;
      // Nunca recargar un formulario en el que ya se escribió algo.
      if (iframeRef.current && frameTouchedRef.current) return;
      window.clearTimeout(loadTimerRef.current);
      setMounted(true);
      setFallbackHref(formURL(false, email).href);
      setStatus("Cargando el formulario…");

      iframeRef.current?.remove();
      const iframe = document.createElement("iframe");
      iframe.title = "Lista de espera de Academia Merlo";
      iframe.width = "100%";
      iframe.height = "500";
      iframe.setAttribute("data-tally-src", formURL(true, email).href);
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.addEventListener("focus", () => {
        frameTouchedRef.current = true;
      });
      frameHostRef.current?.append(iframe);
      iframeRef.current = iframe;

      loadWidget()
        .then(() => window.Tally?.loadEmbeds?.())
        .catch(() => {
          setStatus("No pudimos cargar el formulario. Puedes abrirlo en otra pestaña.");
        });

      loadTimerRef.current = window.setTimeout(() => {
        setStatus("Si el formulario no aparece, puedes abrirlo en otra pestaña.");
      }, 12000);
    },
    [configured, formURL, loadWidget],
  );

  useEffect(() => {
    if (!configured) return;
    const slot = slotRef.current;
    if (!slot) return;
    const near = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (!iframeRef.current) mount("");
          near.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    near.observe(slot);
    return () => near.disconnect();
    // Solo al montar: evita re-observar en cada cambio de `mount`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured]);

  useEffect(() => {
    const onBlur = () => {
      requestAnimationFrame(() => {
        if (iframeRef.current && document.activeElement === iframeRef.current) {
          frameTouchedRef.current = true;
        }
      });
    };
    window.addEventListener("blur", onBlur);

    const onMessage = (event: MessageEvent) => {
      if (
        !iframeRef.current ||
        event.source !== iframeRef.current.contentWindow ||
        event.origin !== "https://tally.so"
      )
        return;
      let data: unknown = event.data;
      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch {
        return;
      }
      const payload = data as { event?: string; payload?: { formId?: string } };
      if (payload?.payload?.formId !== formId) return;
      if (payload.event === "Tally.FormLoaded") {
        window.clearTimeout(loadTimerRef.current);
        setStatus("");
      }
      if (payload.event === "Tally.FormPageView") frameTouchedRef.current = true;
      if (payload.event === "Tally.FormSubmitted") {
        window.clearTimeout(loadTimerRef.current);
        frameTouchedRef.current = true;
        setStatus("Tu registro fue enviado. Revisá la confirmación en el formulario.");
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("message", onMessage);
    };
  }, [formId]);

  return { configured, slotRef, frameHostRef, mount, status, fallbackHref, mounted };
}
