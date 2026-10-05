import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Devoluciones" };

export default function DevolucionesPage() {
  return (
    <LegalPlaceholder
      title="Política de devoluciones"
      description="Academia Merlo se vende a través de Hotmart, que ofrece garantía de devolución de 7 días desde la compra. Aquí va a vivir el detalle del proceso: cómo pedirla y en cuánto tiempo se resuelve."
    />
  );
}
