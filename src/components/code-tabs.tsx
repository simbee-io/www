"use client";

import { useState } from "react";

export function CodeTabs({
  tabs,
}: {
  tabs: { label: string; code: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4 rounded border overflow-hidden">
      <div className="flex border-b bg-gray-50 dark:bg-gray-900">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-3 py-1.5 text-xs font-medium ${
              active === i
                ? "border-b-2 border-current -mb-px"
                : "opacity-50 hover:opacity-75"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code>{tabs[active].code}</code>
      </pre>
    </div>
  );
}
