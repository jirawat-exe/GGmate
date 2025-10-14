"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  // ปิด behavior scroll restore ของ browser
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ทุกครั้งที่ pathname เปลี่ยน (เปลี่ยนหน้า)
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // ไม่มี UI
}