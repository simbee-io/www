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
    <div className="my-4 rounded-xl border border-border overflow-hidden shadow-sm">
      <div className="flex border-b border-neutral-800 bg-neutral-900">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              "px-4 py-2.5 text-xs font-medium transition-colors cursor-pointer relative",
              active === i
                ? "text-amber-400"
                : "text-neutral-500 hover:text-neutral-300"
            )}
          >
            {tab.label}
            {active === i && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-400" />
            )}
          </button>
        ))}
      </div>
      <pre className="bg-neutral-950 text-neutral-300 p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
