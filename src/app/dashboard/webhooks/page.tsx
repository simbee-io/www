"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/use-api";
import { apiFetch } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Webhook,
} from "lucide-react";

const EVENT_TYPES = [
  "user.created",
  "user.updated",
  "user.deleted",
  "signal.created",
  "signal.batch_created",
  "affinity.computed",
  "affinity.summary_computed",
  "match.computed",
  "match_preferences.updated",
  "clustering.completed",
  "clustering.failed",
  "campaign.created",
  "campaign.updated",
  "campaign.budget_exhausted",
  "impression.recorded",
  "engagement.recorded",
  "scoring.completed",
  "client.tier_changed",
  "consent.updated",
  "data_export.completed",
  "data_deletion.completed",
] as const;

interface WebhookSubscription {
  id: string;
  url: string;
  event_types: string[];
  active: boolean;
  created_at: string;
}

interface WebhooksResponse {
  data: WebhookSubscription[];
}

export default function WebhooksPage() {
  const { session } = useAuth();
  const clientId = session?.client.id;

  const { data, loading, error, refetch } = useApi<WebhooksResponse>(
    clientId ? `/api/v1/clients/${clientId}/webhook_subscriptions` : null
  );

  const [showCreate, setShowCreate] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  function toggleEvent(event: string) {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(event)) next.delete(event);
      else next.add(event);
      return next;
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (selectedEvents.size === 0) {
      setCreateError("Select at least one event type.");
      return;
    }
    setCreating(true);
    setCreateError("");

    try {
      await apiFetch(`/api/v1/clients/${clientId}/webhook_subscriptions`, {
        method: "POST",
        token: session!.token,
        body: JSON.stringify({
          url,
          event_types: [...selectedEvents],
        }),
      });
      setShowCreate(false);
      setUrl("");
      setSelectedEvents(new Set());
      refetch();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create webhook");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await apiFetch(
        `/api/v1/clients/${clientId}/webhook_subscriptions/${id}`,
        { method: "DELETE", token: session!.token }
      );
      refetch();
    } catch {
      // Silent — list will show stale state
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Webhooks</h1>
          <p className="text-text-secondary text-sm mt-1">
            Subscribe to events and receive real-time notifications.
          </p>
        </div>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4" />
          Add webhook
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="mb-6">
          <form onSubmit={handleCreate} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Endpoint URL</Label>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://your-app.com/webhooks/simbee"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label>Event types</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                {EVENT_TYPES.map((event) => (
                  <label
                    key={event}
                    className="flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-surface-sunken cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvents.has(event)}
                      onChange={() => toggleEvent(event)}
                      className="rounded"
                    />
                    <span className="font-mono">{event}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline cursor-pointer"
                  onClick={() => setSelectedEvents(new Set(EVENT_TYPES))}
                >
                  Select all
                </button>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline cursor-pointer"
                  onClick={() => setSelectedEvents(new Set())}
                >
                  Clear
                </button>
              </div>
            </div>
            {createError && (
              <p className="text-sm text-error">{createError}</p>
            )}
            <div className="flex gap-2">
              <Button type="submit" disabled={creating}>
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create webhook"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowCreate(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* List */}
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
          No webhook subscriptions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {data?.data?.map((webhook) => (
            <Card key={webhook.id}>
              <div className="p-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Webhook className="h-4 w-4 text-text-tertiary shrink-0" />
                    <code className="text-sm font-mono truncate">
                      {webhook.url}
                    </code>
                    <Badge
                      variant={webhook.active ? "success" : "secondary"}
                    >
                      {webhook.active ? "active" : "inactive"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {webhook.event_types.map((et) => (
                      <Badge key={et} variant="outline" className="text-[10px]">
                        {et}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-text-tertiary hover:text-error shrink-0"
                  onClick={() => handleDelete(webhook.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
