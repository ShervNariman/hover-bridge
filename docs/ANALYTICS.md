# hover-bridge analytics

## Activation

A visitor activates when they either interact with a demo trigger or copy an installation/usage snippet.

## Events

- `product_viewed`
- `demo_interacted` with `variant=with_bridge|without_bridge`
- `install_copied` with a non-sensitive snippet label

Dedicated `/record` routes are excluded. The integration is inert without a project token, masks all form inputs in replay, does not identify visitors, and must never interrupt demo behavior.

## Vercel variables

```bash
NEXT_PUBLIC_POSTHOG_ENABLED=true
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Validate

1. Confirm the site builds with analytics disabled.
2. Add variables to a Vercel preview.
3. Confirm `product_viewed` in Live Events.
4. Hover both demo triggers and verify each variant is counted once per page session.
5. Copy a snippet and verify `install_copied` contains only its label.
6. Verify `/record` activity is excluded.
7. Build a funnel from `product_viewed` to either activation event.