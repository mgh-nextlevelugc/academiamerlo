import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/academia-merlo-negro.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f3ec",
          padding: "80px",
        }}
      >
        <img
          src={logoSrc}
          width={460}
          height={265}
          alt=""
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 32,
            color: "#546459",
            fontFamily: "sans-serif",
            textAlign: "center",
            maxWidth: 820,
          }}
        >
          Periodismo en el mercado de pases con César Luis Merlo
        </div>
      </div>
    ),
    { ...size },
  );
}
