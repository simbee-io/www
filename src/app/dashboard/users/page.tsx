"use client";

import { useState } from "react";
import { useApi } from "@/lib/use-api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  AlertCircle,
} from "lucide-react";

interface User {
  id: string;
  external_id: string;
  traits: Record<string, unknown>;
  status: string;
  created_at: string;
}

interface UsersResponse {
  data: User[];
  meta?: {
    total_count?: number;
    page?: number;
    per_page?: number;
  };
}

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const perPage = 20;

  const query = search
    ? `/api/v1/users?page=${page}&per_page=${perPage}&q=${encodeURIComponent(search)}`
    : `/api/v1/users?page=${page}&per_page=${perPage}`;

  const { data, loading, error } = useApi<UsersResponse>(query);

  const totalCount = data?.meta?.total_count ?? data?.data?.length ?? 0;
  const hasNext = data?.data?.length === perPage;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-text-secondary text-sm mt-1">
            Manage users in your tenant.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
          <Input
            placeholder="Search by external ID..."
            className="pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
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
          {search ? "No users match your search." : "No users yet. Create your first user via the API."}
        </div>
      ) : (
        <>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">
                      External ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-text-secondary">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-0 hover:bg-surface-sunken transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs">
                        {user.external_id}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                        {user.id}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            user.status === "active" ? "success" : "secondary"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-text-secondary">
              {totalCount > 0 && `${totalCount} user${totalCount === 1 ? "" : "s"}`}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-text-secondary px-2">
                Page {page}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={!hasNext}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
