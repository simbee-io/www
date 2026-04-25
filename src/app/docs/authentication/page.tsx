import type { Metadata } from "next";
import { CodeTabs } from "@/components/code-tabs";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthenticationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Authentication</h1>
      <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-8">
        Simbee authenticates server-to-server traffic with an API key. The
        official SDKs use the key directly — JWT exchange happens transparently
        under the hood. If you call the API by hand, this page covers the raw
        HTTP flow too.
      </p>

      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 mb-10">
        <p className="font-semibold text-sm mb-2">On this page</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-neutral-500 dark:text-neutral-400">
          <li><a href="#overview" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Overview</a></li>
          <li><a href="#sdk" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Using an SDK (recommended)</a></li>
          <li><a href="#token-exchange" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Raw HTTP — exchange API key for JWT</a></li>
          <li><a href="#authenticated-requests" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Authenticated requests</a></li>
          <li><a href="#api-keys" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Managing API keys</a></li>
          <li><a href="#signup" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Provisioning a tenant</a></li>
          <li><a href="#jwks" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">JWKS verification</a></li>
        </ol>
      </nav>

      {/* Overview */}
      <section id="overview" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          You hold one credential: an <strong>API key</strong>. Everything else
          is plumbing.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>
            <strong>SDK path (recommended).</strong> Pass your API key to the
            SDK constructor and call methods. The SDK exchanges the key for a
            short-lived JWT on first use, caches it, and refreshes it before
            expiry. You never write a token-handling line of code.
          </li>
          <li>
            <strong>Raw HTTP path.</strong> One{" "}
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /auth/exchange</code>{" "}
            with your API key returns a JWT. Use that token on subsequent calls
            until it expires (15 min default), then call{" "}
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">/auth/exchange</code>{" "}
            again.
          </li>
        </ul>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Passwords aren&apos;t in the API path. The signup and email-login flows
          further down are for the admin dashboard — not for your application&apos;s
          API calls.
        </p>
      </section>

      {/* SDK */}
      <section id="sdk" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Using an SDK (recommended)</h2>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          Pick your stack and pass the API key in. The SDK handles the exchange,
          caches the JWT for ~15 minutes, and refreshes ~30 seconds before
          expiry under a lock so concurrent requests don&apos;t stampede.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "Ruby",
              code: `require "simbee-sdk"

client = Simbee::Client.new(api_key: ENV.fetch("SIMBEE_API_KEY"))

client.feed.ranked(user_id: "alice")`,
            },
            {
              label: "TypeScript",
              code: `import { SimbeeClient } from "@simbee-io/sdk";

const client = new SimbeeClient({ apiKey: process.env.SIMBEE_API_KEY! });

const { data } = await client.fetch.GET("/api/v1/users/{id}/feed/ranked", {
  params: { path: { id: "alice" } },
});`,
            },
            {
              label: "Python",
              code: `import os
from simbee_sdk import Client

client = Client(api_key=os.environ["SIMBEE_API_KEY"])

client.feed.ranked(user_id="alice")`,
            },
          ]}
        />
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          That is the entire authentication story for the SDK path.
        </p>
      </section>

      {/* Raw HTTP — exchange */}
      <section id="token-exchange" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Raw HTTP — exchange API key for JWT</h2>
        <p className="mb-3 text-neutral-500 dark:text-neutral-400">
          When you can&apos;t use an SDK (curl, an unsupported language, a
          one-off integration), trade your API key for a JWT once and reuse the
          token until it expires.
        </p>
        <CodeTabs
          tabs={[
            {
              label: "curl",
              code: `curl -X POST https://api.simbee.io/auth/exchange \\
  -H "Content-Type: application/json" \\
  -d '{"api_key": "'"$SIMBEE_API_KEY"'"}'`,
            },
          ]}
        />
        <p className="mt-3 mb-2 text-sm text-neutral-500 dark:text-neutral-400">Response:</p>
        <CodeTabs
          tabs={[
            {
              label: "JSON",
              code: `{
  "data": {
    "token": "eyJhbGciOiJFUzI1NiIs...",
    "expires_in": 900,
    "scopes": ["admin", "read:user", "..."]
  }
}`,
            },
          ]}
        />
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          The token is a 15-minute ES256 JWT signed by Simbee. When{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">expires_in</code>{" "}
          gets close to zero, call{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">/auth/exchange</code>{" "}
          again. There is no refresh token in this flow — your API key is the
          long-lived credential.
        </p>
      </section>

      {/* Sign up */}
      <section id="signup" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">1. Sign up</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Create a new tenant by providing an email, password, and company name.
          The response includes your client, an owner user, and a JWT you can
          use immediately.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST https://api.simbee.io/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alice@example.com",
    "password": "a-strong-password",
    "company_name": "Acme Corp"
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { AuthenticationApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
});
const auth = new AuthenticationApi(config);

const { data } = await auth.createAuthSignup({
  email: "alice@example.com",
  password: "a-strong-password",
  company_name: "Acme Corp",
});

console.log(data.client.id); // Your client ID
console.log(data.token);     // Initial JWT`,
            },
            {
              label: "Ruby",
              code: `require "simbee-client"

SimbeeClient.configure do |c|
  c.base_url = "https://api.simbee.io"
end

auth = SimbeeClient::AuthenticationApi.new
result = auth.create_auth_signup(
  SimbeeClient::Signup.new(
    email: "alice@example.com",
    password: "a-strong-password",
    company_name: "Acme Corp"
  )
)

puts result.client.id  # Your client ID
puts result.token       # Initial JWT`,
            },
            {
              label: "Python",
              code: `from simbee_client import ApiClient, Configuration
from simbee_client.api import AuthenticationApi
from simbee_client.models import Signup

config = Configuration(host="https://api.simbee.io")

with ApiClient(config) as client:
    auth = AuthenticationApi(client)
    result = auth.create_auth_signup(
        Signup(
            email="alice@example.com",
            password="a-strong-password",
            company_name="Acme Corp",
        )
    )

    print(result.client.id)  # Your client ID
    print(result.token)       # Initial JWT`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "client": {
    "id": "cl_abc123",
    "slug": "acme-corp",
    "name": "Acme Corp",
    "status": "active",
    "tier": "graph"
  },
  "user": {
    "id": "cu_xyz789",
    "email": "alice@example.com",
    "role": "owner"
  },
  "token": "eyJhbGciOiJFZERTQSIs...",
  "scopes": ["admin", "read", "write"],
  "expires_in": 900
}`}</code>
        </pre>
        <p className="text-sm mt-2 text-neutral-500 dark:text-neutral-400">
          Save the <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">client.id</code> — you need it for
          all subsequent API calls. The initial token is valid for 15 minutes.
        </p>
      </section>

      {/* Create API key */}
      <section id="api-keys" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">2. Create an API key</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          API keys are used for programmatic access. Create one using the initial
          token from signup. The raw key is returned only once — store it
          securely.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST https://api.simbee.io/api/v1/clients/cl_abc123/api_keys \\
  -H "Authorization: Bearer eyJhbGciOiJFZERTQSIs..." \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "production" }'`,
            },
            {
              label: "TypeScript",
              code: `import { APIKeysApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
  accessToken: "eyJhbGciOiJFZERTQSIs...",
});
const keys = new APIKeysApi(config);

const { data } = await keys.createApiV1AdminApiKey(
  "cl_abc123",
  { name: "production" }
);

// Store this securely — shown only once
console.log(data.raw_key);`,
            },
            {
              label: "Ruby",
              code: `SimbeeClient.configure do |c|
  c.base_url = "https://api.simbee.io"
  c.access_token = "eyJhbGciOiJFZERTQSIs..."
end

keys_api = SimbeeClient::APIKeysApi.new
result = keys_api.create_api_v1_admin_api_key(
  "cl_abc123",
  SimbeeClient::CreateApiKey.new(name: "production")
)

# Store this securely — shown only once
puts result.raw_key`,
            },
            {
              label: "Python",
              code: `from simbee_client import ApiClient, Configuration
from simbee_client.api import APIKeysApi
from simbee_client.models import CreateApiKey

config = Configuration(
    host="https://api.simbee.io",
    access_token="eyJhbGciOiJFZERTQSIs...",
)

with ApiClient(config) as client:
    keys_api = APIKeysApi(client)
    result = keys_api.create_api_v1_admin_api_key(
        "cl_abc123",
        CreateApiKey(name="production"),
    )

    # Store this securely — shown only once
    print(result.raw_key)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "raw_key": "simbee_aBcDeFgHiJkLmNoPqRsTuVwXyZ",
  "record": {
    "id": "ak_def456",
    "client_id": "cl_abc123",
    "name": "production",
    "fingerprint": "fp_a1b2c3",
    "revoked": false,
    "created_at": "2026-04-11T12:00:00Z"
  }
}`}</code>
        </pre>
      </section>

      {/* Token exchange */}
      <section id="token-exchange" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          3. Exchange credentials for a JWT
        </h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Use <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">/auth/token</code> to exchange
          credentials for a short-lived JWT. Tokens are valid for 15 minutes
          (900 seconds) by default.
        </p>

        <h3 className="text-lg font-semibold mb-2">Email login</h3>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          The simplest way to authenticate. Provide the email and password used
          during signup.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST https://api.simbee.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "alice@example.com",
    "password": "a-strong-password"
  }'`,
            },
            {
              label: "TypeScript",
              code: `import { AuthenticationApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
});
const auth = new AuthenticationApi(config);

const { data } = await auth.createAuthToken({
  email: "alice@example.com",
  password: "a-strong-password",
});

const token = data.token;
const expiresIn = data.expires_in; // 900`,
            },
            {
              label: "Ruby",
              code: `auth = SimbeeClient::AuthenticationApi.new
result = auth.create_auth_token(
  SimbeeClient::CreateToken.new(
    email: "alice@example.com",
    password: "a-strong-password"
  )
)

token = result.token
expires_in = result.expires_in  # 900`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import AuthenticationApi
from simbee_client.models import CreateToken

auth = AuthenticationApi(client)
result = auth.create_auth_token(
    CreateToken(
        email="alice@example.com",
        password="a-strong-password",
    )
)

token = result.token
expires_in = result.expires_in  # 900`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-6 mb-2">Programmatic login</h3>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          For service-to-service or automated flows, authenticate with{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">client_id</code> and{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">user_id</code> instead of email.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `curl -X POST https://api.simbee.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{
    "client_id": "cl_abc123",
    "user_id": "owner",
    "password": "a-strong-password"
  }'`,
            },
            {
              label: "TypeScript",
              code: `const { data } = await auth.createAuthToken({
  client_id: "cl_abc123",
  user_id: "owner",
  password: "a-strong-password",
});

const token = data.token;`,
            },
            {
              label: "Ruby",
              code: `result = auth.create_auth_token(
  SimbeeClient::CreateToken.new(
    client_id: "cl_abc123",
    user_id: "owner",
    password: "a-strong-password"
  )
)

token = result.token`,
            },
            {
              label: "Python",
              code: `result = auth.create_auth_token(
    CreateToken(
        client_id="cl_abc123",
        user_id="owner",
        password="a-strong-password",
    )
)

token = result.token`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 200 OK
{
  "token": "eyJhbGciOiJFZERTQSIs...",
  "scopes": ["admin", "read", "write"],
  "expires_in": 900,
  "user": {
    "id": "cu_xyz789",
    "email": "alice@example.com",
    "role": "owner"
  },
  "client": {
    "id": "cl_abc123",
    "slug": "acme-corp",
    "name": "Acme Corp"
  }
}`}</code>
        </pre>
      </section>

      {/* Authenticated requests */}
      <section id="authenticated-requests" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          4. Make authenticated requests
        </h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Include the JWT in the <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">Authorization</code>{" "}
          header as a Bearer token on every API request.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "cURL",
              code: `# List users
curl https://api.simbee.io/api/v1/users \\
  -H "Authorization: Bearer eyJhbGciOiJFZERTQSIs..."

# Create a user
curl -X POST https://api.simbee.io/api/v1/users \\
  -H "Authorization: Bearer eyJhbGciOiJFZERTQSIs..." \\
  -H "Content-Type: application/json" \\
  -d '{ "external_id": "user_42", "traits": { "name": "Bob" } }'`,
            },
            {
              label: "TypeScript",
              code: `import { UsersApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
  accessToken: token,
});
const users = new UsersApi(config);

// List users
const { data: list } = await users.listApiV1Users();

// Create a user
const { data: created } = await users.createApiV1User({
  external_id: "user_42",
  traits: { name: "Bob" },
});`,
            },
            {
              label: "Ruby",
              code: `SimbeeClient.configure do |c|
  c.base_url = "https://api.simbee.io"
  c.access_token = token
end

users_api = SimbeeClient::UsersApi.new

# List users
list = users_api.list_api_v1_users

# Create a user
created = users_api.create_api_v1_user(
  SimbeeClient::CreateUser.new(
    external_id: "user_42",
    traits: { name: "Bob" }
  )
)`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import UsersApi
from simbee_client.models import CreateUser

config = Configuration(
    host="https://api.simbee.io",
    access_token=token,
)

with ApiClient(config) as client:
    users_api = UsersApi(client)

    # List users
    users_list = users_api.list_api_v1_users()

    # Create a user
    created = users_api.create_api_v1_user(
        CreateUser(
            external_id="user_42",
            traits={"name": "Bob"},
        )
    )`,
            },
          ]}
        />
      </section>

      {/* Token refresh */}
      <section id="token-refresh" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">5. Token refresh</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          Tokens expire after <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">expires_in</code>{" "}
          seconds (default: 900s). When expired, the API returns{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">401 Unauthorized</code>. Call{" "}
          <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /auth/token</code> again with the same
          credentials to get a new token.
        </p>

        <p className="font-semibold mb-2">Recommended pattern:</p>
        <ol className="list-decimal pl-5 space-y-1 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <li>
            Store the token and its expiry time (
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">now + expires_in</code>).
          </li>
          <li>Before each request, check if the token is within 60s of expiry.</li>
          <li>
            If near expiry, call <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">/auth/token</code> to
            refresh.
          </li>
          <li>
            On <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">401</code> responses, re-authenticate
            and retry the request once.
          </li>
        </ol>

        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `class SimbeeAuth {
  private token: string | null = null;
  private expiresAt = 0;

  constructor(
    private email: string,
    private password: string,
  ) {}

  async getToken(): Promise<string> {
    if (this.token && Date.now() < this.expiresAt - 60_000) {
      return this.token;
    }
    const auth = new AuthenticationApi(
      new Configuration({ basePath: "https://api.simbee.io" })
    );
    const { data } = await auth.createAuthToken({
      email: this.email,
      password: this.password,
    });
    this.token = data.token;
    this.expiresAt = Date.now() + data.expires_in * 1000;
    return this.token;
  }
}`,
            },
            {
              label: "Ruby",
              code: `class SimbeeAuth
  def initialize(email:, password:)
    @email = email
    @password = password
    @token = nil
    @expires_at = Time.at(0)
  end

  def token
    return @token if @token && Time.now < @expires_at - 60

    auth = SimbeeClient::AuthenticationApi.new
    result = auth.create_auth_token(
      SimbeeClient::CreateToken.new(
        email: @email,
        password: @password
      )
    )
    @token = result.token
    @expires_at = Time.now + result.expires_in
    @token
  end
end`,
            },
            {
              label: "Python",
              code: `import time
from simbee_client import ApiClient, Configuration
from simbee_client.api import AuthenticationApi
from simbee_client.models import CreateToken


class SimbeeAuth:
    def __init__(self, email: str, password: str):
        self.email = email
        self.password = password
        self._token: str | None = None
        self._expires_at: float = 0

    def get_token(self) -> str:
        if self._token and time.time() < self._expires_at - 60:
            return self._token

        config = Configuration(host="https://api.simbee.io")
        with ApiClient(config) as client:
            auth = AuthenticationApi(client)
            result = auth.create_auth_token(
                CreateToken(
                    email=self.email,
                    password=self.password,
                )
            )
        self._token = result.token
        self._expires_at = time.time() + result.expires_in
        return self._token`,
            },
          ]}
        />
      </section>

      {/* JWKS verification */}
      <section id="jwks" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          6. JWKS verification (backend-to-backend)
        </h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          To verify Simbee JWTs independently without calling the API, fetch
          public keys from the JWKS endpoint:
        </p>

        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto mb-4">
          <code>GET https://api.simbee.io/.well-known/jwks.json</code>
        </pre>

        <p className="mb-4 text-neutral-500 dark:text-neutral-400">
          The response contains the public keys used to sign session tokens.
          Use any standard JWT library to verify tokens against these keys.
        </p>

        <CodeTabs
          tabs={[
            {
              label: "TypeScript",
              code: `import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: "https://api.simbee.io/.well-known/jwks.json",
  cache: true,
  rateLimit: true,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    callback(err, key?.getPublicKey());
  });
}

jwt.verify(token, getKey, { algorithms: ["EdDSA"] }, (err, decoded) => {
  if (err) throw err;
  console.log(decoded.sub); // User ID
  console.log(decoded.aud); // Client ID
});`,
            },
            {
              label: "Ruby",
              code: `require "jwt"
require "net/http"
require "json"

jwks_uri = "https://api.simbee.io/.well-known/jwks.json"
jwks_raw = JSON.parse(Net::HTTP.get(URI(jwks_uri)))
jwks = JWT::JWK::Set.new(jwks_raw)

decoded = JWT.decode(
  token,
  nil,
  true,
  algorithms: ["EdDSA"],
  jwks: jwks
)

puts decoded.first["sub"]  # User ID
puts decoded.first["aud"]  # Client ID`,
            },
            {
              label: "Python",
              code: `import jwt
import requests

jwks_url = "https://api.simbee.io/.well-known/jwks.json"
jwks = requests.get(jwks_url).json()
public_keys = {
    k["kid"]: jwt.algorithms.OKPAlgorithm.from_jwk(k)
    for k in jwks["keys"]
}

header = jwt.get_unverified_header(token)
key = public_keys[header["kid"]]

decoded = jwt.decode(token, key=key, algorithms=["EdDSA"])

print(decoded["sub"])  # User ID
print(decoded["aud"])  # Client ID`,
            },
          ]}
        />

        <div className="text-sm mt-4 p-3 rounded-md border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 text-neutral-500 dark:text-neutral-400">
          <strong>Cache the JWKS response.</strong> Public keys rotate
          infrequently. Cache for at least 5 minutes. If verification fails with
          an unknown <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">kid</code>, refresh the cache and
          retry once before rejecting.
        </div>
      </section>
    </div>
  );
}
