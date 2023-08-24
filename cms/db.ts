import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";
import { fileURLToPath } from "https://deno.land/std@0.105.0/node/url.ts";

const dbPath = fileURLToPath(new URL("./db.sqlite", import.meta.url));

export const db = new DB(dbPath);

export function getFirstPost() {
  const res = db.query("SELECT title, body FROM Posts")[0];
  if (!res) return ["Untitled", ""];

  const [title, body] = res;
  return [title as string, body as string];
}

export function getHookUrls() {
  const res = db.query("SELECT url FROM Hooks");
  return res.map(([url]) => url as string);
}
