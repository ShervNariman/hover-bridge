"use client";

import { useEffect } from "react";

type Client = { capture: (event: string, properties?: Record<string, unknown>) => void };

const environment = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown";

function capture(event: string, properties: Record<string, unknown> = {}) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_ENABLED === "false") return;
  try {
    const posthog = (window as Window & { posthog?: Client }).posthog;
    posthog?.capture(event, {
      product: "hover-bridge",
      surface: "web",
      environment,
      route: window.location.pathname,
      ...properties,
    });
  } catch {
    // Analytics must never interrupt the demo.
  }
}

export function ProductEvents() {
  useEffect(() => {
    if (window.location.pathname === "/record" || window.location.pathname.startsWith("/record/")) return;

    const interacted = new Set<string>();

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = target?.closest<HTMLElement>('[class*="peer/trigger"]');
      if (!trigger) return;
      const variant = trigger.classList.contains("hover-bridge") ? "with_bridge" : "without_bridge";
      if (interacted.has(variant)) return;
      interacted.add(variant);
      capture("demo_interacted", { interaction: "hover_trigger", variant });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const button = target?.closest<HTMLButtonElement>("button");
      if (!button || !/copy|copied/i.test(button.textContent ?? "")) return;
      const block = button.closest(".space-y-2");
      const label = block?.querySelector("p")?.textContent?.trim().toLowerCase() ?? "unknown";
      capture("install_copied", { snippet: label });
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
