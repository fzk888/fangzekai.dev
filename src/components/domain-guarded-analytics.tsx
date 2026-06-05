"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const ALLOWED_HOSTS = ["fangzekai.vercel.app"];

export function DomainGuardedAnalytics({ gaId }: { gaId: string }) {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    setIsAllowed(ALLOWED_HOSTS.includes(window.location.hostname));
  }, []);

  if (!isAllowed) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
