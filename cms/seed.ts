import { db } from "./db.ts";

db.execute(`
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS Hooks;
CREATE TABLE Posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  body TEXT
);
CREATE TABLE Hooks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT
);
INSERT INTO Posts (title, body) VALUES ('Hello', 'World');
`);
