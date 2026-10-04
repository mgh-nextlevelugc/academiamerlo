import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Términos y condiciones" };

export default function TerminosPage() {
  return (
    <LegalPlaceholder
      title="Términos y condiciones"
      description="Acá van a vivir los términos de uso del sitio y de compra del curso: condiciones de acceso, uso del Discord y del contenido, y responsabilidades de cada parte."
    />
  );
}
