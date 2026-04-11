"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthGuard } from "@/components/auth-guard";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Key,
  Webhook,
  SlidersHorizontal,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/dashboard/scoring", label: "Scoring", icon: SlidersHorizontal },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { session, logout } = useAuth();

  return (
    <aside className="hidden md:flex w-56 flex-col border-r border-border bg-surface-sunken">
      <div className="px-4 py-4 border-b border-border">
        <p className="text-sm font-medium truncate">
          {session?.client.name}
        </p>
        <p className="text-xs text-text-tertiary truncate">
          {session?.client.id}
        </p>
      </div>
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, ...rest }) => {
          const exact = "exact" in rest && rest.exact;
          const active = exact
            ? pathname === href
            : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-amber-100/60 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300"
                  : "text-text-secondary hover:text-text hover:bg-surface-raised"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-3 border-t border-border">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-secondary hover:text-text hover:bg-surface-raised transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}
