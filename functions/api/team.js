import { json } from '../_lib/security.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: 'Content service is not configured.' }, 503);
  const { results } = await env.DB.prepare(
    `SELECT number, name, designation, bio, photo
     FROM team_members ORDER BY sort_order ASC, id ASC`,
  ).all();
  return json(results);
}
