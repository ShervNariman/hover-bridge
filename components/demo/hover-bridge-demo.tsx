"use client";

import { useState } from "react";
import { CheckIcon, ChevronDownIcon, CopyIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const demoMenuItems = ["Analytics", "Automation"];

const DEMO_GAP = 24;

const sizes = [
  { class: "hover-bridge-sm", px: "8px" },
  { class: "hover-bridge-md", px: "16px" },
  { class: "hover-bridge-lg", px: "28px" },
] as const;

function StatusPill({ bridged }: { bridged: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-sm",
        bridged ? "bg-emerald-600 text-white" : "bg-red-600 text-white",
      )}
    >
      {bridged ? (
        <>
          <CheckIcon className="size-4 stroke-[3]" />
          Menu stays open
        </>
      ) : (
        <>
          <XIcon className="size-4 stroke-[3]" />
          Menu closes
        </>
      )}
    </div>
  );
}

function GapStrip({
  bridged,
  showOverlay,
}: {
  bridged: boolean;
  showOverlay: boolean;
}) {
  if (!showOverlay) {
    return (
      <div
        className="pointer-events-none shrink-0"
        style={{ height: DEMO_GAP }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none flex shrink-0 items-center justify-center border-2 border-dashed",
        bridged
          ? "border-sky-600/50 bg-sky-500/15"
          : "border-red-600/50 bg-red-500/15",
      )}
      style={{ height: DEMO_GAP }}
    >
      <span
        className={cn(
          "text-sm font-bold",
          bridged ? "text-sky-700 dark:text-sky-300" : "text-red-700 dark:text-red-400",
        )}
      >
        {bridged ? "Bridge" : "Dead zone"}
      </span>
    </div>
  );
}

function MenuSurface({ bridged }: { bridged: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-popover p-2 shadow-md transition-all duration-150",
        "invisible translate-y-1 opacity-0 pointer-events-none",
        "peer-hover/trigger:visible peer-hover/trigger:translate-y-0 peer-hover/trigger:opacity-100 peer-hover/trigger:pointer-events-auto",
        bridged &&
          "hover:visible hover:translate-y-0 hover:opacity-100 hover:pointer-events-auto",
      )}
    >
      {demoMenuItems.map((item) => (
        <button
          key={item}
          type="button"
          className="flex w-full rounded-md px-3 py-2.5 text-left text-base font-medium hover:bg-muted"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function DemoCard({
  bridged,
  showOverlay,
}: {
  bridged: boolean;
  showOverlay: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[26rem] flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:min-h-[28rem] sm:gap-6 sm:p-8 md:p-9",
        bridged
          ? "border-emerald-500/30 ring-1 ring-emerald-500/15"
          : "border-red-500/30 ring-1 ring-red-500/15",
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center sm:gap-5">
        <h2 className="text-xl font-semibold tracking-tight">
          {bridged ? "With bridge" : "Without"}
        </h2>
        <StatusPill bridged={bridged} />
      </div>

      <div className="flex min-h-[15.5rem] flex-1 flex-col rounded-xl border border-border/50 bg-muted/30 p-5 sm:min-h-[17rem] sm:p-6">
        <div className="mx-auto flex w-full max-w-[19rem] flex-1 flex-col sm:max-w-xs md:max-w-sm">
          <div
            className={cn(
              "peer/trigger group/trigger relative z-20 w-full cursor-pointer",
              bridged && "hover-bridge",
              bridged && showOverlay && "hover-bridge-debug",
            )}
            style={
              bridged
                ? ({ "--hover-bridge-size": `${DEMO_GAP}px` } as React.CSSProperties)
                : undefined
            }
          >
            <p className="mb-2.5 animate-pulse text-center text-xs font-medium text-muted-foreground transition-opacity duration-150 group-hover/trigger:animate-none group-hover/trigger:opacity-0">
              Hover me
            </p>
            <div className="rounded-lg border border-border/80 bg-background p-2.5 shadow-sm transition-colors duration-150 group-hover/trigger:border-foreground/20 group-hover/trigger:bg-muted/40">
              <Button
                variant="outline"
                size="lg"
                className="h-10 w-full cursor-pointer gap-2 border-0 bg-transparent text-base font-semibold shadow-none hover:bg-transparent sm:h-11"
              >
                Products
                <ChevronDownIcon className="size-4 opacity-60 transition-transform duration-150 group-hover/trigger:rotate-180" />
              </Button>
            </div>
          </div>

          <GapStrip bridged={bridged} showOverlay={showOverlay} />
          <MenuSurface bridged={bridged} />
        </div>
      </div>

      <p className="mt-auto pt-2 text-center text-sm text-muted-foreground">
        Move from Products to the menu.
      </p>
    </div>
  );
}

function CodeBlock({
  label,
  code,
  note,
  comingSoon,
}: {
  label: string;
  code: string;
  note?: string;
  comingSoon?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {comingSoon ? (
          <span className="rounded-full border bg-muted/50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Coming soon
          </span>
        ) : null}
      </div>
      {note ? (
        <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>
      ) : null}
      <div className="relative rounded-xl border bg-muted/40">
        <pre className="overflow-x-auto px-5 py-4 pr-24 font-mono text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="absolute top-3 right-3 gap-1.5 bg-background/80 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <CheckIcon className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="size-3.5" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function UsageSection() {
  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-muted-foreground">
        The npm package is not published yet — until then, copy{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
          registry/hover-bridge/hover-bridge.css
        </code>{" "}
        into your repo and import it.
      </p>

      <CodeBlock
        label="Install"
        code="pnpm add hover-bridge"
        comingSoon
        note="Placeholder command — package publishing is coming soon."
      />

      <CodeBlock
        label="Import"
        code='import "hover-bridge/styles.css"'
        note="Import once in your app entry or global stylesheet."
      />

      <CodeBlock
        label="Usage"
        code='<div className="hover-bridge hover-bridge-md">'
        note="Wrap your trigger and menu. Match the size variant to your gap."
      />

      <CodeBlock
        label="Debug"
        code='<div className="hover-bridge hover-bridge-md hover-bridge-debug">'
        note="Add hover-bridge-debug to visualize the invisible bridge while developing."
      />
    </div>
  );
}

function HowItWorksSection() {
  const diagramSteps = [
    { title: "Trigger", detail: "Button, link, or nav item" },
    {
      title: "Invisible bridge",
      detail: "::before pseudo-element",
      highlight: true,
    },
    { title: "Dropdown", detail: "Menu panel below" },
  ] as const;

  const limitations = [
    "Works best when trigger and menu share the same hover container.",
    "Not a replacement for keyboard-accessible menu behavior.",
    "Pair with accessible menu components in production.",
  ] as const;

  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-card px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-xs flex-col items-center gap-2">
          {diagramSteps.map((step, index) => (
            <div key={step.title} className="flex w-full flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-center",
                  "highlight" in step && step.highlight
                    ? "border-dashed border-primary/30 bg-primary/5"
                    : "bg-muted/20",
                )}
              >
                <p className="text-sm font-medium">{step.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.detail}
                </p>
              </div>
              {index < diagramSteps.length - 1 ? (
                <ChevronDownIcon
                  className="size-4 text-muted-foreground/50"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          hover-bridge adds a positioned{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            ::before
          </code>{" "}
          pseudo-element that spans the gap — keeping the hover target connected
          while the cursor moves from trigger to menu.
        </p>
        <p>
          Add{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            hover-bridge-debug
          </code>{" "}
          during development to reveal the bridge as a striped overlay.
        </p>
      </div>

      <div className="rounded-xl border border-dashed bg-muted/20 px-5 py-4">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Limitations
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {limitations.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-muted-foreground/50" aria-hidden="true">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
      {children}
    </h2>
  );
}

function Section({
  label,
  action,
  children,
  className,
}: {
  label: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SectionLabel>{label}</SectionLabel>
        {action}
      </div>
      {children}
    </section>
  );
}

const heroBadges = ["CSS only", "Zero JavaScript", "Debug mode"] as const;

export function HoverBridgeDemo() {
  const [showGapOverlays, setShowGapOverlays] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10 sm:py-14">
      <header className="mx-auto max-w-xl space-y-4 text-center">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {heroBadges.map((badge) => (
            <li
              key={badge}
              className="rounded-full border bg-muted/40 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground"
            >
              {badge}
            </li>
          ))}
        </ul>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">
            Make hover menus less fragile.
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Dropdowns close when your cursor crosses the gap between a
            trigger and its menu. hover-bridge adds an invisible safe area —
            one class, zero JavaScript.
          </p>
        </div>
      </header>

      <Section
        label="Demo"
        className="mt-10 sm:mt-12"
        action={
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={showGapOverlays}
              onChange={(event) => setShowGapOverlays(event.target.checked)}
              className="size-4 rounded border-input accent-primary"
            />
            Show gap overlays
          </label>
        }
      >
        <div className="grid items-stretch gap-6 overflow-visible sm:grid-cols-2 sm:gap-8 md:gap-10">
          <DemoCard bridged={false} showOverlay={showGapOverlays} />
          <DemoCard bridged={true} showOverlay={showGapOverlays} />
        </div>
      </Section>

      <Section label="How it works" className="mt-14 sm:mt-16">
        <HowItWorksSection />
      </Section>

      <Section label="Usage" className="mt-14 sm:mt-16">
        <UsageSection />
      </Section>

      <Section label="Sizes" className="mt-14 sm:mt-16">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Pick the variant that matches the distance between your trigger and
          menu.
        </p>
        <div className="divide-y rounded-xl border bg-card">
          {sizes.map(({ class: className, px }) => (
            <div
              key={className}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <code className="font-mono text-sm">{className}</code>
              <span className="text-sm tabular-nums text-muted-foreground">
                {px}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <footer className="mt-16 border-t pt-8 text-center text-xs text-muted-foreground">
        hover-bridge — open-source CSS utility for forgiving hover menus.
      </footer>
    </div>
  );
}
