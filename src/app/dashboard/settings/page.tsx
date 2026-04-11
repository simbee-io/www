"use client";

import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { session } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
          Account and tenant configuration.
        </p>
      </div>

      <div className="space-y-6">
        {/* Tenant info */}
        <Card>
          <CardHeader>
            <CardTitle>Tenant</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <SettingsRow label="Name" value={session?.client.name ?? "-"} />
              <Separator />
              <SettingsRow label="Client ID" value={session?.client.id ?? "-"} mono />
              <Separator />
              <SettingsRow label="Slug" value={session?.client.slug ?? "-"} mono />
              <Separator />
              <SettingsRow
                label="Tier"
                value={
                  <Badge variant="outline">
                    {session?.client.tier ?? "-"}
                  </Badge>
                }
              />
              <Separator />
              <SettingsRow
                label="Status"
                value={
                  <Badge
                    variant={
                      session?.client.status === "active" ? "success" : "secondary"
                    }
                  >
                    {session?.client.status ?? "-"}
                  </Badge>
                }
              />
            </dl>
          </CardContent>
        </Card>

        {/* Current user */}
        <Card>
          <CardHeader>
            <CardTitle>Current user</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <SettingsRow label="User ID" value={session?.user.id ?? "-"} mono />
              <Separator />
              <SettingsRow label="Email" value={session?.user.email ?? "-"} />
              <Separator />
              <SettingsRow
                label="Role"
                value={
                  <Badge variant="outline">
                    {session?.user.role ?? "-"}
                  </Badge>
                }
              />
            </dl>
          </CardContent>
        </Card>

        {/* Session */}
        <Card>
          <CardHeader>
            <CardTitle>Session</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3">
              <SettingsRow
                label="Scopes"
                value={
                  <div className="flex flex-wrap gap-1">
                    {session?.scopes.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                }
              />
              <Separator />
              <SettingsRow
                label="Expires"
                value={
                  session
                    ? new Date(session.expiresAt).toLocaleString()
                    : "-"
                }
              />
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SettingsRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd className={`text-sm ${mono ? "font-mono text-xs" : ""}`}>{value}</dd>
    </div>
  );
}
