"use client";

import { cn } from "@atlas/ui";

import { CopyStatusIcon } from "@/components/marketing/copy-status-icon";
import {
  getCopyAnnouncement,
  useCopyToClipboard,
} from "@/components/marketing/use-copy-to-clipboard";

interface CodeCopyButtonProps {
  code: string;
  className?: string;
  label?: string;
  /** Optional visible text shown beside the icon. Keep it contained in `label`. */
  visibleLabel?: string;
}

export function CodeCopyButton({
  code,
  className,
  label = "Copy code",
  visibleLabel,
}: CodeCopyButtonProps) {
  const { status, copy } = useCopyToClipboard();

  return (
    <>
      <button
        type="button"
        className={cn("atlas-code-window__copy", className)}
        onClick={() => copy(code)}
        aria-label={label}
        data-copy-status={status}
      >
        <CopyStatusIcon status={status} />
        {visibleLabel ? <span aria-hidden="true">{visibleLabel}</span> : null}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {getCopyAnnouncement(status)}
      </span>
    </>
  );
}
