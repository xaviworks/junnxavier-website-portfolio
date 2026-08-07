export async function apiFetch(path, options) {
  const response = await fetch(path, {
    headers: { accept: 'application/json', ...(options?.headers || {}) },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || 'Unable to load data.');
  return payload;
}
