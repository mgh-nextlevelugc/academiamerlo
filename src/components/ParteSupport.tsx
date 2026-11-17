import { parteContent } from "@/lib/content";

export function ParteSupport() {
  return (
    <p className="parte-support">
      {parteContent.supportPrompt}{" "}
      <a href={`mailto:${parteContent.supportEmail}`}>
        {parteContent.supportEmail}
      </a>
      .
    </p>
  );
}
