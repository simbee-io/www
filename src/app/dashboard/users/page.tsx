"use client";

import { useState } from "react";
import { useApi } from "@/lib/use-api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";

interface User {
  id: string;
  client_id: string;
  external_id: string;
  cluster_id?: string;
  nsfw_opt_in?: boolean;
  cluster_confidence?: number;
  traits?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
}

interface UsersResponse {
  data: User[];
}

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useApi<UsersResponse>("/api/v1/users");

  const filtered = search
    ? data?.data?.filter((u) =>
        u.external_id.toLowerCase().includes(search.toLowerCase())
      )
    : data?.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
            Manage users in your tenant.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
          <Input
            placeholder="Search by external ID..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
      ) : !filtered?.length ? (
        <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
          {search ? "No users match your search." : "No users yet. Create your first user via the API."}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    External ID
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Cluster
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs">
                      {user.external_id}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      {user.id}
                    </td>
                    <td className="px-4 py-3">
                      {user.cluster_id ? (
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {user.cluster_id.slice(0, 8)}
                        </Badge>
                      ) : (
                        <span className="text-xs text-neutral-400 dark:text-neutral-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 dark:text-neutral-400">
            {filtered.length} user{filtered.length === 1 ? "" : "s"}
          </div>
        </Card>
      )}
    </div>
  );
}
