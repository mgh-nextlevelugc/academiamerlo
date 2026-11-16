"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "@/lib/site-config";
import { trackMetaPage } from "@/lib/meta-pixel";

export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPage(META_PIXEL_ID, pathname);
  }, [pathname]);

  return null;
}
