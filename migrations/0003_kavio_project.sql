-- Add Kavio without duplicating an existing project or assuming a launch date.
INSERT INTO projects (number, title, body, project_date, sort_order)
SELECT
  printf('%02d', COALESCE((SELECT MAX(CAST(number AS INTEGER)) FROM projects), 0) + 1),
  'Kavio',
  'A digital business companion for Filipino micro and small businesses. Track sales, expenses, inventory, and customer balances—even offline—with tools that adapt to your negosyo. Pro adds cloud sync and AI assistance; Business adds multiple business workspaces and mobile and web access.',
  NULL,
  COALESCE((SELECT MAX(sort_order) FROM projects), 0) + 1
WHERE NOT EXISTS (
  SELECT 1 FROM projects WHERE lower(trim(title)) = 'kavio'
);
