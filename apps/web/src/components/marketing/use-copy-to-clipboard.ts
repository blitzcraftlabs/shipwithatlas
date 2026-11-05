"use client";

import * as React from "react";

export type CopyStatus = "idle" | "copied" | "error";

const RESET_DELAY_MS = 2000;

/**
 * Copies text to the clipboard and exposes a transient status so callers can
 * render visual feedback and announce it through a live region.
 */
export function useCopyToClipboard() {
  const [status, setStatus] = React.useState<CopyStatus>("idle");
  const timeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = React.useCallback(async (text: string) => {
    window.clearTimeout(timeoutRef.current);
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timeoutRef.current = window.setTimeout(() => setStatus("idle"), RESET_DELAY_MS);
  }, []);

  return { status, copy };
}

export function getCopyAnnouncement(status: CopyStatus) {
  if (status === "copied") return "Copied to clipboard";
  if (status === "error") return "Copy failed. Select the text to copy it manually.";
  return "";
}
