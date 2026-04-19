import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_data (
      id TEXT PRIMARY KEY DEFAULT 'main',
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

export async function getPortfolioDataFromDB() {
  const rows = await sql`SELECT data FROM portfolio_data WHERE id = 'main'`;
  return rows[0]?.data ?? null;
}

export async function savePortfolioDataToDB(data: unknown) {
  await sql`
    INSERT INTO portfolio_data (id, data, updated_at)
    VALUES ('main', ${JSON.stringify(data)}, now())
    ON CONFLICT (id)
    DO UPDATE SET data = EXCLUDED.data, updated_at = now()
  `;
}
