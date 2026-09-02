import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/brand/prime-tech-logo.jpeg"));
  const logoSrc = `data:image/jpeg;base64,${logoData.toString("base64")}`;

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
          background: "#08090b",
          backgroundImage:
            "radial-gradient(circle at 50% 45%, rgba(46,125,255,0.35) 0%, rgba(8,9,11,0) 60%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 128,
            height: 128,
            borderRadius: 28,
            overflow: "hidden",
            background: "#000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={128} height={128} style={{ objectFit: "cover" }} />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -1.5,
            color: "#ffffff",
          }}
        >
          PRIME<span style={{ color: "#2e7dff" }}>&nbsp;TECH</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
