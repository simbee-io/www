"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, ApiError } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import {
  Check,
  Copy,
  ArrowRight,
} from "lucide-react";

type Step = "form" | "success";

interface SignupResult {
  clientId: string;
  clientSlug: string;
  apiKey: string;
}

export function SignupForm() {
  const { signup } = useAuth();
  const [step, setStep] = useState<Step>("form");
  const [result, setResult] = useState<SignupResult | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const data = await signup(email, password, companyName);

      // Create the first API key automatically
      const keyRes = await apiFetch<{
        raw_key: string;
      }>(`/api/v1/clients/${data.client.id}/api_keys`, {
        method: "POST",
        token: data.token,
        body: JSON.stringify({ name: "default" }),
      });

      setResult({
        clientId: data.client.id,
        clientSlug: data.client.slug,
        apiKey: keyRes.raw_key,
      });
      setStep("success");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function copyKey() {
    if (!result) return;
    await navigator.clipboard.writeText(result.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (step === "success" && result) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Check className="h-6 w-6 text-green-700 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-semibold mb-1">You&apos;re all set</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Your tenant <strong>{result.clientSlug}</strong> is ready.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <h3 className="font-semibold mb-1">Your API key</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
            This is shown only once. Store it securely.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg bg-neutral-950 border border-neutral-800 text-amber-300 px-3 py-2 text-sm font-mono overflow-x-auto">
              {result.apiKey}
            </code>
            <Button variant="secondary" size="icon" onClick={copyKey}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <h3 className="font-semibold mb-3">Quick start</h3>
          <div className="space-y-3">
            <QuickstartStep
              number="1"
              title="Authenticate"
              code={`curl -X POST ${process.env.NEXT_PUBLIC_API_URL || "https://api.simbee.io"}/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "YOUR_EMAIL", "password": "YOUR_PASSWORD"}'`}
            />
            <QuickstartStep
              number="2"
              title="Create a user"
              code={`curl -X POST ${process.env.NEXT_PUBLIC_API_URL || "https://api.simbee.io"}/api/v1/users \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"external_id": "user_1", "traits": {"name": "Alice"}}'`}
            />
            <QuickstartStep
              number="3"
              title="Send a signal"
              code={`curl -X POST ${process.env.NEXT_PUBLIC_API_URL || "https://api.simbee.io"}/api/v1/users/USER_ID/signals \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"signal_type": "like", "tag_name": "jazz"}'`}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1" render={<Link href="/dashboard" />}>
              Go to dashboard
              <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="secondary" className="flex-1" render={<Link href="/docs" />}>
            Read the docs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company name</Label>
          <Input
            id="company"
            type="text"
            placeholder="Acme Corp"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" loading={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-600 dark:text-amber-400 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}

function QuickstartStep({
  number,
  title,
  code,
}: {
  number: string;
  title: string;
  code: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-[10px] font-bold text-white shadow-sm">
          {number}
        </span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <pre className="rounded-lg bg-neutral-950 text-neutral-300 px-3 py-2 text-xs overflow-x-auto border border-neutral-800">
        <code>{code}</code>
      </pre>
    </div>
  );
}
