"use client";

import { useApi } from "@/lib/use-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, SlidersHorizontal } from "lucide-react";

interface ScoringPreset {
  id: string;
  name: string;
  description: string;
  weights: Record<string, number>;
  active: boolean;
}

interface ScoringPresetsResponse {
  data: ScoringPreset[];
}

export default function ScoringPage() {
  const { data, loading, error } = useApi<ScoringPresetsResponse>(
    "/api/v1/scoring_presets"
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Scoring</h1>
        <p className="text-text-secondary text-sm mt-1">
          Scoring presets control how users are ranked. Different presets produce
          different results from the same data.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-text-tertiary" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 py-12 justify-center text-sm text-error">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-12 text-text-secondary text-sm">
          No scoring presets configured. Presets are created via the API.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data?.data?.map((preset) => (
            <Card key={preset.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <CardTitle>{preset.name}</CardTitle>
                  </div>
                  <Badge variant={preset.active ? "success" : "secondary"}>
                    {preset.active ? "active" : "inactive"}
                  </Badge>
                </div>
                {preset.description && (
                  <CardDescription>{preset.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs font-medium text-text-secondary mb-2">
                  Weights
                </p>
                <div className="space-y-1.5">
                  {Object.entries(preset.weights).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary">{key}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${Math.min(val * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">
                          {val}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
