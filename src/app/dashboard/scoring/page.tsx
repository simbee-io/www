"use client";

import { useApi } from "@/lib/use-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, SlidersHorizontal } from "lucide-react";

type PresetConfig = Record<string, unknown>;
type LayerPresets = Record<string, PresetConfig>;
type AvailablePresets = Record<string, LayerPresets>;

interface PresetsResponse {
  data: AvailablePresets;
}

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (typeof val === "object") return JSON.stringify(val);
  return String(val);
}

export default function ScoringPage() {
  const { data, loading, error } = useApi<PresetsResponse>(
    "/api/v1/config/scoring/presets"
  );

  const layers = data?.data ? Object.entries(data.data) : [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scoring</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
          Built-in presets per scoring layer. Select one preset per layer to
          control how users are ranked.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400 dark:text-neutral-500" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 py-12 justify-center text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : layers.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
          No scoring presets available.
        </div>
      ) : (
        <div className="space-y-8">
          {layers.map(([layer, presets]) => (
            <section key={layer}>
              <div className="flex items-center gap-2 mb-3">
                <SlidersHorizontal className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <h2 className="text-lg font-semibold">{layer}</h2>
                <Badge variant="outline">{Object.keys(presets).length}</Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(presets).map(([presetName, config]) => (
                  <Card key={`${layer}.${presetName}`}>
                    <CardHeader>
                      <CardTitle className="font-mono text-sm">{presetName}</CardTitle>
                      <CardDescription className="font-mono text-[11px]">
                        {layer}.{presetName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-1.5">
                        {Object.entries(config).map(([key, val]) => (
                          <div
                            key={key}
                            className="flex items-start justify-between gap-3 text-xs"
                          >
                            <dt className="font-mono text-neutral-500 dark:text-neutral-400 truncate">
                              {key}
                            </dt>
                            <dd className="font-mono text-neutral-900 dark:text-neutral-100 text-right break-all">
                              {formatValue(val)}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
