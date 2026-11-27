"use client";

import { useEffect } from "react";
import { ASK_API } from "@/lib/askApi";

const SENT_KEY = "visit-alert-sent";
const DWELL_MS = 5000; // only people who stay a few seconds with the page in view
const RETRY_MS = 10_000; // the backend may be waking up from sleep
const MAX_TRIES = 6;

// Sends Sriram a quiet phone notification when a real person visits: once per browser per day.
// Skipped on localhost, for automated browsers, and in browsers opted out via
// https://sriramkofc.github.io/#toggle-goatcounter (GoatCounter's own "skipgc" flag).
export default function VisitAlert() {
  useEffect(() => {
    const today = new Date().toDateString();
    try {
      if (
        location.hostname !== "sriramkofc.github.io" ||
        navigator.webdriver ||
        localStorage.getItem("skipgc") === "t" ||
        localStorage.getItem(SENT_KEY) === today
      )
        return;
    } catch {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let tries = 0;

    const send = async () => {
      try {
        const r = await fetch(`${ASK_API}/api/visit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: location.pathname + location.hash, referrer: document.referrer }),
        });
        if (r.ok) {
          localStorage.setItem(SENT_KEY, today);
          return;
        }
      } catch {}
      if (++tries < MAX_TRIES) timer = setTimeout(send, RETRY_MS);
    };

    // Start the dwell timer only while the page is actually being looked at
    const start = () => {
      if (document.visibilityState !== "visible" || timer) return;
      timer = setTimeout(send, DWELL_MS);
      document.removeEventListener("visibilitychange", start);
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  return null;
}
