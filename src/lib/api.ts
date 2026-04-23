
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<TResponse, TBody = unknown>(
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<ApiResponse<TResponse>> {
  const {
    method = "GET",
    body,
    headers = {},
    cache,
    revalidate,
    tags,
  } = options;

  const url = `${BASE_URL}${endpoint}`;

  const nextOptions: NextFetchRequestConfig = {};
  if (revalidate !== undefined) nextOptions.revalidate = revalidate;
  if (tags) nextOptions.tags = tags;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: revalidate !== undefined ? undefined : cache,
      next: nextOptions,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        data: null,
        error: errorData?.message ?? `HTTP error ${res.status}`,
        status: res.status,
      };
    }

    // Handle 204 No Content
    if (res.status === 204) {
      return { data: null, error: null, status: 204 };
    }

    const data: TResponse = await res.json();
    return { data, error: null, status: res.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { data: null, error: message, status: 0 };
  }
}




export const api = {
  get: <TRes>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<TRes>(endpoint, { ...options, method: "GET" }),

  post: <TRes, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions, "method" | "body">) =>
    request<TRes, TBody>(endpoint, { ...options, method: "POST", body }),

  put: <TRes, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions, "method" | "body">) =>
    request<TRes, TBody>(endpoint, { ...options, method: "PUT", body }),

  patch: <TRes, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions, "method" | "body">) =>
    request<TRes, TBody>(endpoint, { ...options, method: "PATCH", body }),

  delete: <TRes>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<TRes>(endpoint, { ...options, method: "DELETE" }),
};