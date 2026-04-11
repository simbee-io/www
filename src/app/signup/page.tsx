import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-2 text-text-secondary">
          Get your API key and start building in under a minute.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
