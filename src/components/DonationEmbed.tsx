"use client";

import Script from "next/script";

const GIVINGTECH_SCRIPT_URL =
  "https://secureddonation.com/Content/js/givingtech-embed.js";

type DonationEmbedProps = {
  formUrl: string;
  title: string;
};

export default function DonationEmbed({ formUrl, title }: DonationEmbedProps) {
  return (
    <>
      <Script
        id="givingtech-embed"
        src={GIVINGTECH_SCRIPT_URL}
        strategy="afterInteractive"
      />
      <div
        data-givingtech={formUrl}
        data-givingtech-title={title}
        data-givingtech-forward="utm_*,ref,fbclid,gclid"
      />
    </>
  );
}
