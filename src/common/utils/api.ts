export function extractListFromApiResponse<T = unknown>(payload: unknown): T[] {
  const visited = new Set<unknown>();

  const walk = (value: unknown): T[] | null => {
    if (Array.isArray(value)) return value as T[];
    if (!value || typeof value !== "object") return null;
    if (visited.has(value)) return null;

    visited.add(value);

    const record = value as Record<string, unknown>;

    for (const key of ["records", "data", "items", "results"]) {
      const nested = walk(record[key]);
      if (nested) return nested;
    }

    return null;
  };

  return walk(payload) ?? [];
}

export function resolveApiAssetUrl(url: string | null | undefined, fallback: string) {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const host = apiUrl.replace(/\/api\/v1\/?$/, "");

  return host ? `${host}${url.startsWith("/") ? url : `/${url}`}` : url;
}
