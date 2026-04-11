"use client";

import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/use-api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Activity, Brain, BarChart3, Loader2 } from "lucide-react";

interface UsersList {
  data: Array<{ id: string }>;
  meta?: { total_count?: number };
}

export default function DashboardOverview() {
  const { session } = useAuth();
  const clientId = session?.client.id;

  const { data: users, loading: usersLoading } = useApi<UsersList>(
    clientId ? "/api/v1/users?per_page=1" : null
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Welcome back. Here&apos;s an overview of your tenant.
        </p>
      </div>

      {/* Tenant info */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{session?.client.name}</p>
              <p className="text-sm text-text-secondary">
                {session?.client.id} &middot; {session?.client.slug}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={session?.client.status === "active" ? "success" : "secondary"}>
                {session?.client.status}
              </Badge>
              <Badge variant="outline">{session?.client.tier}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Users"
          value={
            usersLoading
              ? undefined
              : users?.meta?.total_count?.toString() ?? users?.data?.length?.toString() ?? "0"
          }
        />
        <StatCard icon={Activity} label="Signals (24h)" value="-" />
        <StatCard icon={Brain} label="Clusters" value="-" />
        <StatCard icon={BarChart3} label="Events (24h)" value="-" />
      </div>

      <p className="mt-8 text-sm text-text-tertiary">
        Detailed analytics are available once your tenant has activity. Start by
        creating users and recording signals.
      </p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string | undefined;
}) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">{label}</p>
            {value === undefined ? (
              <Loader2 className="h-4 w-4 animate-spin text-text-tertiary mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1">{value}</p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
