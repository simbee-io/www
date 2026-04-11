import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Codes",
};

export default function ErrorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Error Codes</h1>
      <p className="text-lg text-text-secondary mb-8">
        The Simbee API uses standard HTTP status codes and returns errors in a
        consistent JSON format.
      </p>

      {/* Error format */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Error response format</h2>
        <p className="mb-4 text-text-secondary">
          All error responses include a <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">message</code>{" "}
          field. Validation errors additionally include an{" "}
          <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">errors</code> array with field-level
          details.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Standard error</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto mb-4">
          <code>{`{
  "message": "Not found"
}`}</code>
        </pre>

        <h3 className="text-lg font-semibold mt-4 mb-2">Validation error</h3>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto mb-4">
          <code>{`{
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "is required" },
    { "field": "password", "message": "is too short (minimum 8 characters)" }
  ]
}`}</code>
        </pre>

        <h3 className="text-lg font-semibold mt-4 mb-2">
          Validation error (analytics endpoints)
        </h3>
        <p className="text-sm text-text-secondary mb-2">
          Analytics endpoints (Python/FastAPI) use the OpenAPI validation format:
        </p>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`{
  "detail": [
    {
      "loc": ["body", "client_id"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}`}</code>
        </pre>
      </section>

      {/* Status codes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">HTTP status codes</h2>

        <h3 className="text-lg font-semibold mt-6 mb-2">Success codes</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Meaning</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Used for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-2.5"><code className="text-xs">200</code></td>
                <td className="px-4 py-2.5">OK</td>
                <td className="px-4 py-2.5 text-text-secondary">GET, PUT, PATCH, DELETE responses</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2.5"><code className="text-xs">201</code></td>
                <td className="px-4 py-2.5">Created</td>
                <td className="px-4 py-2.5 text-text-secondary">POST that creates a new resource</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5"><code className="text-xs">204</code></td>
                <td className="px-4 py-2.5">No Content</td>
                <td className="px-4 py-2.5 text-text-secondary">DELETE with no response body</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Client error codes</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Meaning</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Common causes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["400", "Bad Request", "Malformed JSON, invalid query parameters, vector dimension mismatch"],
                ["401", "Unauthorized", "Missing or expired JWT, invalid credentials on /auth/token"],
                ["403", "Forbidden", "Insufficient role/scopes for the requested operation"],
                ["404", "Not Found", "Resource does not exist or has been soft-deleted"],
                ["409", "Conflict", "Duplicate external_id, duplicate vocabulary entry"],
                ["422", "Unprocessable Entity", "Validation failed — missing required fields, invalid values"],
                ["429", "Too Many Requests", "Rate limited by Envoy gateway or per-endpoint limits"],
              ].map(([code, meaning, causes]) => (
                <tr key={code} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5"><code className="text-xs">{code}</code></td>
                  <td className="px-4 py-2.5">{meaning}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{causes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Server error codes</h3>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Meaning</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["500", "Internal Server Error", "Unexpected error. Retry with backoff. If persistent, contact support."],
                ["502", "Bad Gateway", "Upstream service unavailable. Retry after a few seconds."],
                ["503", "Service Unavailable", "Service is temporarily down or overloaded. Retry with exponential backoff."],
              ].map(([code, meaning, action]) => (
                <tr key={code} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5"><code className="text-xs">{code}</code></td>
                  <td className="px-4 py-2.5">{meaning}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rate limiting */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Rate limiting</h2>
        <p className="mb-4 text-text-secondary">
          The API enforces rate limits at the Envoy gateway level. When rate
          limited, you receive a <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">429</code> response
          with headers indicating the limit:
        </p>
        <pre className="rounded-md bg-neutral-900 text-neutral-300 p-4 text-sm overflow-x-auto mb-4">
          <code>{`HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1718100000`}</code>
        </pre>
        <p className="text-sm text-text-secondary">
          Back off and retry after the <code className="text-xs bg-surface-sunken px-1.5 py-0.5 rounded">X-RateLimit-Reset</code>{" "}
          timestamp.
        </p>
      </section>

      {/* Retry guidance */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Retry guidance</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Code</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Retry?</th>
                <th className="text-left px-4 py-2.5 font-medium text-text-secondary">Strategy</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["400", "No", "Fix the request"],
                ["401", "Yes, once", "Re-authenticate, then retry with new token"],
                ["403", "No", "Check your role and scopes"],
                ["404", "No", "Check the resource ID"],
                ["409", "No", "Resolve the conflict (duplicate ID)"],
                ["422", "No", "Fix validation errors in the request body"],
                ["429", "Yes", "Wait until X-RateLimit-Reset"],
                ["500", "Yes", "Exponential backoff, max 3 retries"],
                ["502", "Yes", "Retry after 1-2 seconds"],
                ["503", "Yes", "Exponential backoff, max 5 retries"],
              ].map(([code, retry, strategy]) => (
                <tr key={code} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5"><code className="text-xs">{code}</code></td>
                  <td className="px-4 py-2.5">{retry}</td>
                  <td className="px-4 py-2.5 text-text-secondary">{strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
