let _token = null;

export function setToken(token) {
  _token = token || null;
  try {
    if (token) localStorage.setItem("auth.token", token);
    else localStorage.removeItem("auth.token");
  } catch {}
}

export function getStoredToken() {
  try {
    return localStorage.getItem("auth.token");
  } catch {
    return null;
  }
}

export function clearToken() {
  setToken(null);
}

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

async function request(
  path,
  { method = "GET", body, headers = {}, signal } = {}
) {
  if (!API_URL) {
    throw new Error(
      "VITE_API_URL is not set. Please configure your .env.local"
    );
  }

  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const hasBody = body !== undefined && body !== null;
  const init = {
    method,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(headers || {}),
    },
    ...(hasBody
      ? { body: typeof body === "string" ? body : JSON.stringify(body) }
      : {}),
    ...(signal ? { signal } : {}),
  };

  // Attach auth header if we have a token
  const token = _token ?? getStoredToken();
  if (token) {
    init.headers = { ...init.headers, Authorization: `Bearer ${token}` };
  }

  const res = await fetch(url, init);
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      data?.msg || data?.error || res.statusText || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    error.payload = data;
    if (res.status === 401) {
      try {
        localStorage.removeItem("auth.token");
      } catch {}
    }
    throw error;
  }

  return data;
}

const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: "PATCH", body }),
  del: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

export default api;
