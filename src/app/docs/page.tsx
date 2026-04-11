import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocsHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Simbee Documentation</h1>
      <p className="text-lg mb-8">
        Simbee is an API platform that turns user behavior into structured
        relationships, recommendations, and insights. It provides composable
        primitives — signals, affinities, vocabulary, scoring, clustering,
        campaigns, and feed — that your application composes to build
        personalization, discovery, and analytics features.
      </p>

      <h2 className="text-xl font-semibold mb-3">Guides</h2>
      <ul className="list-disc pl-5 space-y-2 mb-8">
        <li>
          <Link href="/docs/authentication" className="underline">
            Authentication
          </Link>{" "}
          — Sign up, create API keys, exchange credentials for JWTs, and make
          authenticated requests.
        </li>
        <li>
          <Link href="/docs/errors" className="underline">
            Error Codes
          </Link>{" "}
          — Standard error response format and HTTP status codes.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Reference</h2>
      <ul className="list-disc pl-5 space-y-2 mb-8">
        <li>
          <Link href="/docs/reference" className="underline">
            API Reference
          </Link>{" "}
          — Interactive reference for all endpoints, generated from the OpenAPI
          spec.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">SDKs</h2>
      <p className="mb-2">Typed clients are available for:</p>
      <ul className="list-disc pl-5 space-y-1 mb-8">
        <li>
          <strong>TypeScript</strong> —{" "}
          <code className="text-sm">@simbee-io/client</code> (npm)
        </li>
        <li>
          <strong>Ruby</strong> —{" "}
          <code className="text-sm">simbee-client</code> (gem)
        </li>
        <li>
          <strong>Python</strong> —{" "}
          <code className="text-sm">simbee-client</code> (pip)
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Quick start</h2>
      <ol className="list-decimal pl-5 space-y-4">
        <li>
          <strong>Sign up</strong>
          <pre className="mt-1 bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm overflow-x-auto">
            <code>{`curl -X POST https://api.simbee.io/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@example.com", "password": "...", "company_name": "Acme"}'`}</code>
          </pre>
        </li>
        <li>
          <strong>Authenticate</strong>
          <pre className="mt-1 bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm overflow-x-auto">
            <code>{`curl -X POST https://api.simbee.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id": "YOUR_CLIENT_ID", "user_id": "owner", "password": "..."}'`}</code>
          </pre>
        </li>
        <li>
          <strong>Make API calls</strong>
          <pre className="mt-1 bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm overflow-x-auto">
            <code>{`curl https://api.simbee.io/api/v1/users \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"`}</code>
          </pre>
        </li>
      </ol>
    </div>
  );
}
