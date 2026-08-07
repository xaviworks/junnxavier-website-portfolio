CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL,
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  project_date TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS insights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at TEXT NOT NULL
);

INSERT INTO team_members (number, name, designation, bio, photo, sort_order) VALUES
  ('01', 'Rumel B. Eumague Jr.', 'Sole Proprietor / CEO / Founder', 'Company leadership and direction.', 'rumel.jpeg', 1),
  ('02', 'Junn Xavier T. Adalid', 'CPTO / Co-Founder', 'Product, technology, and long-term vision.', 'xavier.jpeg', 2),
  ('03', 'Niel Jehush I. Palicte', 'CTO / Co-Founder', 'Technology strategy and technical delivery.', 'niel.jpeg', 3),
  ('04', 'Patrick Jhun T. Adalid', 'Software Developer / Marketing Manager', 'Software development and market growth.', 'patrick1.jpeg', 4),
  ('05', 'Leo J Bande', 'QA Specialist', 'Quality, reliability, and release confidence.', 'leo.jpeg', 5);

INSERT INTO projects (number, title, body, project_date, sort_order) VALUES
  ('01', 'E-commerce platforms', 'Product, order, and customer flow built around your operation.', '2026-01-15', 1),
  ('02', 'Internal dashboards', 'A single source of truth that keeps your team aligned.', '2026-02-20', 2),
  ('03', 'Client portals', 'Sales systems that shorten response time and reduce delays.', '2026-03-12', 3),
  ('04', 'Workflow automation', 'Connected processes that reduce manual work and keep teams moving.', '2026-04-08', 4),
  ('05', 'CRM & sales systems', 'Better lead management, faster follow-up, and clearer customer journeys.', '2026-05-18', 5);
