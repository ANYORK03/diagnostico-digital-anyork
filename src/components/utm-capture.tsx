"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/storage";

export function UtmCapture() {
  useEffect(() => {
    captureUtm(window.location.search);
  }, []);

  return null;
}
