import {
  cleanText,
  enforceRateLimit,
  json,
  sameOrigin,
  verifyTurnstile,
  validEmail,
} from '../_lib/security.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!sameOrigin(request)) return json({ error: 'Request blocked.' }, 403);

  const limit = await enforceRateLimit(request, env);
  if (!limit.allowed) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'retry-after': String(limit.retryAfter),
      },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Hidden honeypot: real users never fill this field.
  if (cleanText(body.website, 100)) return json({ ok: true });

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const message = cleanText(body.message, 4000);
  const turnstileToken = cleanText(body.turnstileToken, 4096);

  if (name.length < 2 || !validEmail(email) || message.length < 10) {
    return json({ error: 'Please provide a valid name, email, and message.' }, 422);
  }

  if (!(await verifyTurnstile(turnstileToken, request, env))) {
    return json({ error: 'Security verification failed. Please try again.' }, 403);
  }

  if (!env.DB) return json({ error: 'Contact service is not configured.' }, 503);

  await env.DB.prepare(
    `INSERT INTO contact_submissions (name, email, message, created_at)
     VALUES (?, ?, ?, ?)`,
  ).bind(name, email, message, new Date().toISOString()).run();

  return json({ ok: true, message: 'Thanks. We will get back to you soon.' }, 201);
}

export function onRequestGet() {
  return json({ error: 'Method not allowed.' }, 405);
}
