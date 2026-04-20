# TODOS

## TDD Exceptions

- `src/app/layout.tsx` — `maxWidth="max-w-7xl"` props on `SiteHeader`/`SiteFooter`. Cosmetic container-width override to align the shared `@skeptik/ui` chrome (default `max-w-6xl`) with Simbee page containers that use `max-w-7xl`. No logic; prop pass-through only. Next.js `layout.tsx` has no existing test harness in this project.
