import type { CodeSnippet } from "./types"

export const HERO_CODE_TABS: CodeSnippet[] = [
  {
    id: "feature-module",
    label: "Feature module",
    filename: "apps/web/src/features/users/queries.ts",
    language: "typescript",
    highlightedLines: [3],
    sourceHref:
      "https://github.com/blitzcraftlabs/atlas/tree/main/apps/web/src/features",
    code: `export function useUserList(params?: { page?: number }) {
  return useQuery<UserListResponse, ApiError>({
    queryKey: userKeys.list(params),
    queryFn: async () => {
      return api.users.list(params);
    },
  });
}`,
  },
  {
    id: "openapi",
    label: "OpenAPI contract",
    filename: "openapi/openapi.json",
    language: "json",
    highlightedLines: [12],
    sourceHref: "https://github.com/blitzcraftlabs/atlas/tree/main/openapi",
    code: `{
  "openapi": "3.0.3",
  "paths": {
    "/users": {
      "get": {
        "operationId": "listUsers",
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/UserListResponse" }
              }
            }
          }
        }
      }
    }
  }
}`,
  },
  {
    id: "ci",
    label: "CI workflow",
    filename: ".github/workflows/ci.yml",
    language: "yaml",
    highlightedLines: [8, 9, 10],
    sourceHref:
      "https://github.com/blitzcraftlabs/atlas/tree/main/.github/workflows",
    code: `name: CI
on: [pull_request, push]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm validate:env
      - run: pnpm lint && pnpm typecheck
      - run: pnpm test && pnpm build`,
  },
  {
    id: "agents",
    label: "AGENTS.md",
    filename: "AGENTS.md",
    language: "markdown",
    highlightedLines: [4, 5],
    sourceHref: "https://github.com/blitzcraftlabs/atlas/blob/main/AGENTS.md",
    code: `## Feature architecture

1. Route — thin page under apps/web/src/app/
2. Feature module — apps/web/src/features/<name>/
   - keys.ts — query key factory
   - queries.ts / mutations.ts
3. No cross-feature imports`,
  },
]
