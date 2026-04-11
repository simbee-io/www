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
        Simbee uses JWT bearer tokens for API authentication. This guide walks
        through the complete flow: signing up, creating API keys, exchanging
        credentials for tokens, and making authenticated requests.
      </p>

      <nav className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 mb-10">
        <p className="font-semibold text-sm mb-2">On this page</p>
        <ol className="list-decimal list-inside text-sm space-y-1 text-neutral-500 dark:text-neutral-400">
          <li><a href="#overview" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Overview</a></li>
          <li><a href="#signup" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Sign up</a></li>
          <li><a href="#api-keys" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Create an API key</a></li>
          <li><a href="#token-exchange" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Exchange credentials for a JWT</a></li>
          <li><a href="#authenticated-requests" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Make authenticated requests</a></li>
          <li><a href="#token-refresh" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">Token refresh</a></li>
          <li><a href="#jwks" className="hover:text-neutral-900 dark:text-neutral-100 transition-colors">JWKS verification</a></li>
        </ol>
      </nav>

      {/* Overview */}
      <section id="overview" className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>
        <p className="mb-4 text-neutral-500 dark:text-neutral-400">The authentication flow has three steps:</p>
        <ol className="list-decimal pl-5 space-y-2 mb-4">
          <li>
            <strong>Sign up</strong> — Create a tenant via{" "}
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /auth/signup</code>. You receive a
            client, owner user, and an initial JWT.
          </li>
          <li>
            <strong>Create an API key</strong> — Use the initial token to create
            a named API key via{" "}
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">
              POST /api/v1/clients/:client_id/api_keys
            </code>
            . The raw key is shown only once.
          </li>
          <li>
            <strong>Authenticate</strong> — Exchange credentials for a JWT via{" "}
            <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /auth/token</code>. Include the token
            as <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">Authorization: Bearer &lt;token&gt;</code>{" "}
            on all subsequent requests.
          </li>
        </ol>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Tokens are short-lived (15 minutes by default). When a token expires,
          re-authenticate with <code className="text-xs bg-neutral-50 dark:bg-neutral-950 px-1.5 py-0.5 rounded">POST /auth/token</code>.
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

console.log(data.data.client.id); // Your client ID
console.log(data.data.token);     // Initial JWT`,
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

puts result.data.client.id  # Your client ID
puts result.data.token       # Initial JWT`,
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

    print(result.data.client.id)  # Your client ID
    print(result.data.token)       # Initial JWT`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
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
    "scopes": ["admin", "read", "write"]
  }
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
console.log(data.data.key);`,
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
puts result.data.key`,
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
    print(result.data.key)`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 201 Created
{
  "data": {
    "id": "ak_def456",
    "client_id": "cl_abc123",
    "name": "production",
    "key": "simbee_aBcDeFgHiJkLmNoPqRsTuVwXyZ",
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
              code: `import { AuthenticationApi, Configuration } from "@simbee-io/client";

const config = new Configuration({
  basePath: "https://api.simbee.io",
});
const auth = new AuthenticationApi(config);

const { data } = await auth.createAuthToken({
  client_id: "cl_abc123",
  user_id: "owner",
  password: "a-strong-password",
});

const token = data.data.token;
const expiresIn = data.data.expires_in; // 900`,
            },
            {
              label: "Ruby",
              code: `auth = SimbeeClient::AuthenticationApi.new
result = auth.create_auth_token(
  SimbeeClient::CreateToken.new(
    client_id: "cl_abc123",
    user_id: "owner",
    password: "a-strong-password"
  )
)

token = result.data.token
expires_in = result.data.expires_in  # 900`,
            },
            {
              label: "Python",
              code: `from simbee_client.api import AuthenticationApi
from simbee_client.models import CreateToken

auth = AuthenticationApi(client)
result = auth.create_auth_token(
    CreateToken(
        client_id="cl_abc123",
        user_id="owner",
        password="a-strong-password",
    )
)

token = result.data.token
expires_in = result.data.expires_in  # 900`,
            },
          ]}
        />

        <h3 className="text-lg font-semibold mt-4 mb-2">Response</h3>
        <pre className="rounded-md bg-neutral-950 text-neutral-300 p-4 text-sm overflow-x-auto">
          <code>{`// 200 OK
{
  "data": {
    "token": "eyJhbGciOiJFZERTQSIs...",
    "scopes": ["admin", "read", "write"],
    "expires_in": 900
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
    private clientId: string,
    private userId: string,
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
      client_id: this.clientId,
      user_id: this.userId,
      password: this.password,
    });
    this.token = data.data.token;
    this.expiresAt = Date.now() + data.data.expires_in * 1000;
    return this.token;
  }
}`,
            },
            {
              label: "Ruby",
              code: `class SimbeeAuth
  def initialize(client_id:, user_id:, password:)
    @client_id = client_id
    @user_id = user_id
    @password = password
    @token = nil
    @expires_at = Time.at(0)
  end

  def token
    return @token if @token && Time.now < @expires_at - 60

    auth = SimbeeClient::AuthenticationApi.new
    result = auth.create_auth_token(
      SimbeeClient::CreateToken.new(
        client_id: @client_id,
        user_id: @user_id,
        password: @password
      )
    )
    @token = result.data.token
    @expires_at = Time.now + result.data.expires_in
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
    def __init__(self, client_id: str, user_id: str, password: str):
        self.client_id = client_id
        self.user_id = user_id
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
                    client_id=self.client_id,
                    user_id=self.user_id,
                    password=self.password,
                )
            )
        self._token = result.data.token
        self._expires_at = time.time() + result.data.expires_in
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
