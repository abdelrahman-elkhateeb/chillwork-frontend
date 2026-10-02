# ChillWork client workspace

The customer site (`apps/web`), the admin and technician dashboard
(`apps/dashboard`) and the shared UI package (`packages/ui`).

See the [project README](../README.md) for what ChillWork does and how to run
it, and the [developer guide](../docs/README.md) for architecture and
conventions.

To add a shadcn/ui component to the shared package:

```bash
npx shadcn@latest add button -c apps/web
```

Then import it from `@workspace/ui/components/button`.
