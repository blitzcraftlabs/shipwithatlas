/**
 * Breadcrumb Tree Definition
 *
 * Route segment tree for breadcrumb resolution. Extend this when adding product routes.
 *
 * @module breadcrumbs/tree
 */

import { staticResolver } from "./builder";

import type { BreadcrumbNode } from "./types";

export const breadcrumbTree: BreadcrumbNode[] = [
  {
    segment: "consulting",
    resolver: staticResolver("Consulting"),
  },
];
