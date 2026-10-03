# Reference patterns

> Adopt settings, permission-aware CRUD, and diagnostics without importing the Atlas reference app.

`apps/reference` in the Atlas repository is an evaluation harness. It is **not** this generated
consumer, and it is not added by `atlas enable`. Use it as an upstream illustration, then implement
product-owned modules here.

Upstream source (read-only): https://github.com/blitzcraftlabs/atlas/tree/main/apps/reference/src/features

## Settings

Build a product settings surface from starter primitives already in `apps/web`:

1. `pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate page settings`
2. Compose consent (`@atlas/consent`), theme (`@atlas/ui` theme hooks), and i18n strings in a
   feature module — not in the route file.
3. Keep environment access behind `@/config`. Do not read `process.env` in UI.

A structural illustration lives upstream in `apps/reference/src/features/components/ReferenceSettingsView.tsx`.
Copy the *composition* (consent + theme + copy), not harness-only controls.

## Permission-aware CRUD

1. `pnpm dlx @blitzcraftlabs/atlas@1.2.2 generate feature <name> --query --mutation --form --tests`
2. Register permissions in `src/lib/application/authz.ts` (independent / product-owned).
3. Gate UI with `Can` / `usePermission` and server routes with `requirePermission` /
   `requireResourcePermission`. See [authorization.md](authorization.md).
4. Handle loading, empty, error, and success with `@atlas/ui` app-state components.

Upstream illustration: `apps/reference/src/features/users/` (OpenAPI-backed users CRUD). Implement
against your API contract; do not import reference feature modules.

## Platform diagnostics

Read runtime config, feature flags, and telemetry through the existing facades (`@/config`,
`src/lib/feature-flags`, `src/lib/telemetry`). A product “status” page can display **non-secret**
capability state for operators.

Do **not** copy these harness-only controls into a product app:

- Simulated authentication / persona switchers
- Reset endpoints that wipe in-memory stores
- Failure-injection or scenario switches intended for the evaluation harness
- `ATLAS_REFERENCE_MODE` and `src/lib/reference/**`

Those remain development-only in the Atlas repository. They are not packaged, not enableable, and
must not ship in production consumers.

## Related docs

- [Examples](examples.md)
- [Authorization](authorization.md)
- [API](api.md)
- [Consumer tooling](consumer-tooling.md)
