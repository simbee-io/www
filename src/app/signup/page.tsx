import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 mb-4">
          <HexIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Start building</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Create your account, grab an API key, and make your first call in
          under a minute.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}

function HexIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7z" />
    </svg>
  );
}
