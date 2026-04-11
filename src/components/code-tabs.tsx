"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function CodeTabs({
  tabs,
}: {
  tabs: { label: string; code: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div className="flex border-b border-border bg-surface-sunken">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "px-3 py-2 text-xs font-medium transition-colors cursor-pointer",
              active === i
                ? "border-b-2 border-primary text-text -mb-px"
                : "text-text-tertiary hover:text-text-secondary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="bg-neutral-900 text-neutral-300 p-4 overflow-x-auto text-sm">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
