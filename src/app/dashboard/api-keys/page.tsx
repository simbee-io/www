"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useApi, useApiMutation } from "@/lib/use-api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Check,
  Copy,
  Key,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  fingerprint: string;
  revoked: boolean;
  last_used_at: string | null;
  created_at: string;
}

interface ApiKeysResponse {
  data: ApiKey[];
}

interface CreateKeyResponse {
  raw_key: string;
  record: ApiKey;
}

export default function ApiKeysPage() {
  const { session } = useAuth();
  const clientId = session?.client.id;

  const { data, loading, error, refetch } = useApi<ApiKeysResponse>(
    clientId ? `/api/v1/clients/${clientId}/api_keys` : null
  );

  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { mutate: createKey, submitting: creating, error: createError } = useApiMutation<
    { name: string },
    CreateKeyResponse
  >(clientId ? `/api/v1/clients/${clientId}/api_keys` : "/noop");

  const [revokeError, setRevokeError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await createKey({ name: newKeyName });
      if (res) {
        setCreatedKey(res.raw_key);
        setNewKeyName("");
        refetch();
      }
    } catch {
      // error state is set by useApiMutation
    }
  }

  async function handleRevoke(keyId: string) {
    const token = session?.token;
    if (!token || !clientId) return;
    setRevokingId(keyId);
    setRevokeError(null);
    try {
      const { apiFetch } = await import("@/lib/api");
      await apiFetch(`/api/v1/clients/${clientId}/api_keys/${keyId}/revoke`, {
        method: "POST",
        token,
      });
      refetch();
    } catch (err) {
      setRevokeError(err instanceof Error ? err.message : "Failed to revoke key");
    } finally {
      setRevokingId(null);
    }
  }

  async function copyKey() {
    if (!createdKey) return;
    await navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
            Create and manage API keys for programmatic access.
          </p>
        </div>
        <Button onClick={() => { setShowCreate(true); setCreatedKey(null); }}>
          <Plus className="h-4 w-4" />
          Create key
        </Button>
      </div>

      {/* Create form */}
      {showCreate && (
        <Card className="mb-6">
          <div className="p-6">
            {createdKey ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <p className="font-medium">Key created</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                  Copy this key now — it won&apos;t be shown again.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <code className="flex-1 rounded bg-neutral-900 text-amber-300 px-3 py-2 text-sm font-mono overflow-x-auto">
                    {createdKey}
                  </code>
                  <Button variant="secondary" size="icon" onClick={copyKey}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setShowCreate(false);
                    setCreatedKey(null);
                  }}
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="key-name">Key name</Label>
                  <Input
                    id="key-name"
                    placeholder="e.g. production, staging, mobile-app"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <Button type="submit" disabled={creating}>
                  {creating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </Button>
              </form>
            )}
          </div>
        </Card>
      )}

      {(createError || revokeError) && (
        <div className="flex items-center gap-2 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {createError || revokeError}
        </div>
      )}

      {/* Keys list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400 dark:text-neutral-500" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 py-12 justify-center text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
          No API keys yet. Create one to get started.
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Fingerprint
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Last used
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Created
                  </th>
                  <th className="px-4 py-3 w-10" />
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((key) => (
                  <tr
                    key={key.id}
                    className="border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:bg-neutral-950 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Key className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
                        {key.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {key.fingerprint}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={key.revoked ? "error" : "success"}>
                        {key.revoked ? "revoked" : "active"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                      {key.last_used_at
                        ? new Date(key.last_used_at).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                      {new Date(key.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {!key.revoked && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-neutral-400 dark:text-neutral-500 hover:text-red-600"
                          onClick={() => handleRevoke(key.id)}
                          disabled={revokingId === key.id}
                        >
                          {revokingId === key.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
