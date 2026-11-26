import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { commerceContent, parteContent } from "@/lib/content";

export const alt = parteContent.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [logo, archivo, sourceSans] = await Promise.all([
    readFile(join(process.cwd(), "public", parteContent.logo)),
    readFile(join(process.cwd(), "src/fonts/og/archivo-bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/source-sans-3-regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "52px 64px 36px",
          borderTop: "14px solid #075334",
          background: "#F6F3EC",
          color: "#15392B",
          fontFamily: "Source Sans 3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            width={160}
            height={92}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div style={{ fontSize: 29, color: "#075334" }}>
            {parteContent.label}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontFamily: "Archivo",
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.06,
            letterSpacing: "-3px",
          }}
        >
          {parteContent.name}
        </div>
        <div
          style={{ fontSize: 38, lineHeight: 1.3, maxWidth: 970, marginTop: 24 }}
        >
          {parteContent.tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: 22,
            borderTop: "1px solid #CDD5CA",
            fontSize: 25,
          }}
        >
          <div>{commerceContent.brand}</div>
          <div style={{ color: "#A28248" }}>{commerceContent.motto}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 700, style: "normal" },
        { name: "Source Sans 3", data: sourceSans, weight: 400, style: "normal" },
      ],
    },
  );
}
