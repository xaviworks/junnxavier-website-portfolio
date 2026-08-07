import { json } from '../_lib/security.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'Content service is not configured.' }, 503);
  const { results } = await env.DB.prepare(
    `SELECT slug, title, excerpt, published_at AS date
     FROM insights WHERE published = 1
     ORDER BY published_at DESC, id DESC`,
  ).all();
  return json(results);
}
