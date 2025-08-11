import * as Sentry from "@sentry/nextjs";

/**
 * A generic wrapper around the native `fetch` API to simplify making JSON requests.
 * @param url The URL to send the request to.
 * @param options Optional `RequestInit` options to pass to the `fetch` call.
 * @returns A promise that resolves to the JSON response body.
 */
export async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers: defaultHeaders });

  if (!res.ok) {
    const error = new Error(`Request failed: ${res.status} ${res.statusText}`);
    Sentry.captureException(error);
    throw error;
  }

  return res.json();
}
