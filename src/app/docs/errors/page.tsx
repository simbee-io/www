import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error Codes",
};

export default function ErrorsPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">Error Codes</h1>
      <p className="text-lg mb-8">
        The Simbee API uses standard HTTP status codes and returns errors in a
        consistent JSON format.
      </p>

      {/* Error format */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Error response format</h2>
        <p className="mb-4">
          All error responses include a <code className="text-sm">message</code>{" "}
          field. Validation errors additionally include an{" "}
          <code className="text-sm">errors</code> array with field-level
          details.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Standard error</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm overflow-x-auto mb-4">
          <code>{`{
  "message": "Not found"
}`}</code>
        </pre>

        <h3 className="text-lg font-semibold mt-4 mb-2">Validation error</h3>
        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm overflow-x-auto mb-4">
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
        <p className="text-sm mb-2">
          Analytics endpoints (Python/FastAPI) use the OpenAPI validation format:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm overflow-x-auto">
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
        <table className="w-full text-sm border">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Meaning</th>
              <th className="text-left px-3 py-2">Used for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-2"><code>200</code></td>
              <td className="px-3 py-2">OK</td>
              <td className="px-3 py-2">GET, PUT, PATCH, DELETE responses</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>201</code></td>
              <td className="px-3 py-2">Created</td>
              <td className="px-3 py-2">POST that creates a new resource</td>
            </tr>
            <tr>
              <td className="px-3 py-2"><code>204</code></td>
              <td className="px-3 py-2">No Content</td>
              <td className="px-3 py-2">DELETE with no response body</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mt-6 mb-2">Client error codes</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Meaning</th>
              <th className="text-left px-3 py-2">Common causes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-2"><code>400</code></td>
              <td className="px-3 py-2">Bad Request</td>
              <td className="px-3 py-2">
                Malformed JSON, invalid query parameters, vector dimension
                mismatch
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>401</code></td>
              <td className="px-3 py-2">Unauthorized</td>
              <td className="px-3 py-2">
                Missing or expired JWT, invalid credentials on{" "}
                <code className="text-sm">/auth/token</code>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>403</code></td>
              <td className="px-3 py-2">Forbidden</td>
              <td className="px-3 py-2">
                Insufficient role/scopes for the requested operation
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>404</code></td>
              <td className="px-3 py-2">Not Found</td>
              <td className="px-3 py-2">
                Resource does not exist or has been soft-deleted
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>409</code></td>
              <td className="px-3 py-2">Conflict</td>
              <td className="px-3 py-2">
                Duplicate <code className="text-sm">external_id</code>,
                duplicate vocabulary entry
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>422</code></td>
              <td className="px-3 py-2">Unprocessable Entity</td>
              <td className="px-3 py-2">
                Validation failed — missing required fields, invalid values,
                schema violations
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2"><code>429</code></td>
              <td className="px-3 py-2">Too Many Requests</td>
              <td className="px-3 py-2">
                Rate limited by Envoy gateway or per-endpoint limits
              </td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold mt-6 mb-2">Server error codes</h3>
        <table className="w-full text-sm border">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Meaning</th>
              <th className="text-left px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-2"><code>500</code></td>
              <td className="px-3 py-2">Internal Server Error</td>
              <td className="px-3 py-2">
                Unexpected error. Retry with backoff. If persistent, contact
                support.
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>502</code></td>
              <td className="px-3 py-2">Bad Gateway</td>
              <td className="px-3 py-2">
                Upstream service unavailable. Retry after a few seconds.
              </td>
            </tr>
            <tr>
              <td className="px-3 py-2"><code>503</code></td>
              <td className="px-3 py-2">Service Unavailable</td>
              <td className="px-3 py-2">
                Service is temporarily down or overloaded. Retry with
                exponential backoff.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Rate limiting */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Rate limiting</h2>
        <p className="mb-4">
          The API enforces rate limits at the Envoy gateway level. When rate
          limited, you receive a <code className="text-sm">429</code> response
          with headers indicating the limit:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 rounded p-4 text-sm overflow-x-auto mb-4">
          <code>{`HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1718100000`}</code>
        </pre>
        <p className="text-sm">
          Back off and retry after the <code className="text-sm">X-RateLimit-Reset</code>{" "}
          timestamp.
        </p>
      </section>

      {/* Retry guidance */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Retry guidance</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr className="border-b bg-gray-50 dark:bg-gray-900">
              <th className="text-left px-3 py-2">Code</th>
              <th className="text-left px-3 py-2">Retry?</th>
              <th className="text-left px-3 py-2">Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-3 py-2"><code>400</code></td>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Fix the request</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>401</code></td>
              <td className="px-3 py-2">Yes, once</td>
              <td className="px-3 py-2">
                Re-authenticate, then retry with new token
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>403</code></td>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Check your role and scopes</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>404</code></td>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Check the resource ID</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>409</code></td>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Resolve the conflict (duplicate ID)</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>422</code></td>
              <td className="px-3 py-2">No</td>
              <td className="px-3 py-2">Fix validation errors in the request body</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>429</code></td>
              <td className="px-3 py-2">Yes</td>
              <td className="px-3 py-2">
                Wait until <code className="text-sm">X-RateLimit-Reset</code>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>500</code></td>
              <td className="px-3 py-2">Yes</td>
              <td className="px-3 py-2">Exponential backoff, max 3 retries</td>
            </tr>
            <tr className="border-b">
              <td className="px-3 py-2"><code>502</code></td>
              <td className="px-3 py-2">Yes</td>
              <td className="px-3 py-2">Retry after 1-2 seconds</td>
            </tr>
            <tr>
              <td className="px-3 py-2"><code>503</code></td>
              <td className="px-3 py-2">Yes</td>
              <td className="px-3 py-2">Exponential backoff, max 5 retries</td>
            </tr>
          </tbody>
        </table>
      </section>
    </article>
  );
}
