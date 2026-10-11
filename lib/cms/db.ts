import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/** True once Neon is connected to the Vercel project (or DATABASE_URL is set locally). Until then the site reads `content/`. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

let client: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  client ??= drizzle(neon(process.env.DATABASE_URL), { schema });
  return client;
}
