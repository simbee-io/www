"use client";

import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/use-api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Loader2 } from "lucide-react";

interface UsersList {
  data: Array<{ id: string }>;
}

export default function DashboardOverview() {
  const { session } = useAuth();
  const clientId = session?.client.id;

  const { data: users, loading: usersLoading } = useApi<UsersList>(
    clientId ? `/api/v1/clients/${clientId}/users` : null
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Dashboard</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">
          Welcome back. Here&apos;s an overview of your tenant.
        </p>
      </div>

      {/* Tenant info */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100">{session?.client.name}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
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

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Users"
          value={
            usersLoading
              ? undefined
              : users?.data?.length?.toString() ?? "0"
          }
          color="text-amber-600 dark:text-amber-400"
          bg="bg-amber-50 dark:bg-amber-500/10"
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: typeof Users;
  label: string;
  value: string | undefined;
  color: string;
  bg: string;
}) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
            {value === undefined ? (
              <Loader2 className="h-4 w-4 animate-spin text-neutral-400 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mt-1">{value}</p>
            )}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
