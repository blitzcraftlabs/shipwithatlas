"use client";

import * as React from "react";

import { Button, cn } from "@atlas/ui";

import { CopyStatusIcon } from "@/components/marketing/copy-status-icon";
import {
  getCopyAnnouncement,
  useCopyToClipboard,
} from "@/components/marketing/use-copy-to-clipboard";

interface CommandStripProps {
  command: string;
  /** Accessible name for the copy button, e.g. "Copy install command". */
  copyLabel: string;
  className?: string;
}

export function CommandStrip({ command, copyLabel, className }: CommandStripProps) {
  const { status, copy } = useCopyToClipboard();

  return (
    <div className={cn("atlas-command-strip", className)}>
      <span className="atlas-command-strip__prompt" aria-hidden="true">
        $
      </span>
      <code className="atlas-command-strip__code">
        {command.split(" ").map((token, index) => (
          <React.Fragment key={`${token}-${index}`}>
            {index > 0 ? " " : null}
            <span className="atlas-command-strip__token">{token}</span>
          </React.Fragment>
        ))}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="atlas-command-strip__copy"
        onClick={() => copy(command)}
        aria-label={copyLabel}
        data-copy-status={status}
      >
        <CopyStatusIcon status={status} />
      </Button>
      <span className="sr-only" role="status" aria-live="polite">
        {getCopyAnnouncement(status)}
      </span>
    </div>
  );
}
