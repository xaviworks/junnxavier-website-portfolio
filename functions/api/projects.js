import { json } from '../_lib/security.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'Content service is not configured.' }, 503);
  const { results } = await env.DB.prepare(
    `SELECT number, title, body, project_date AS date
     FROM projects ORDER BY sort_order ASC, id ASC`,
  ).all();
  return json(results);
}
