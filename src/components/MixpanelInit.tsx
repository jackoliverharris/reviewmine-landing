"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN =
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || "9a62f30593354489021e6f0e30ef1ac5";

export default function MixpanelInit() {
  useEffect(() => {
    mixpanel.init(MIXPANEL_TOKEN, {
      track_pageview: true,
      autocapture: true,
      record_sessions_percent: 100,
      persistence: "localStorage",
      debug: process.env.NODE_ENV !== "production",
    });
    mixpanel.track("Page View", {
      page_url: window.location.href,
      page_title: document.title,
      user_id: "anonymous",
    });
  }, []);

  return null;
}
