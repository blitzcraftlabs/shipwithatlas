"use client";

import { Check, Copy, X } from "lucide-react";

import type { CopyStatus } from "@/components/marketing/use-copy-to-clipboard";

const STATUS_ICONS = { idle: Copy, copied: Check, error: X } as const;

export function CopyStatusIcon({ status }: { status: CopyStatus }) {
  const Icon = STATUS_ICONS[status];
  return <Icon className="size-3.5" aria-hidden="true" />;
}
