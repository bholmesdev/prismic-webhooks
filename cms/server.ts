import { getHomepage, getHostname, getProdPort } from "../utils.ts";
import { db, getFirstPost, getHookUrls } from "./db.ts";

Deno.serve(
  { port: getProdPort() ?? 3000, hostname: getHostname() },
  async (req) => {
    const { pathname } = new URL(req.url);

    switch (pathname) {
      case "/":
        return await handleIndex();
      case "/update-post":
        return await handleUpdatePost(req);
      case "/add-hook":
        return handleAddHook(req);
      default:
        return new Response("Not found", { status: 404 });
    }
  }
);

async function handleIndex() {
  const template = await Deno.readTextFile(
    new URL("./template.html", import.meta.url)
  );
  const [title, body] = getFirstPost();
  const hookUrls = getHookUrls();
  const hookTemplate = hookUrls
    .map((url) => `<li><a href="${url}">${url}</a></li>`)
    .join("");

  const response = template
    .replace("%%TITLE%%", title)
    .replace("%%BODY%%", body)
    .replace("%%HOOKS%%", hookTemplate);

  return new Response(response, { headers: { "Content-Type": "text/html" } });
}

async function handleUpdatePost(req: Request) {
  const post = await req.formData();
  const title = post.get("title");
  const body = post.get("body");

  if (typeof title !== "string" || typeof body !== "string") {
    return new Response("Invalid `title` or `body`", { status: 400 });
  }

  db.query("UPDATE Posts SET title = ?, body = ?", [title, body]);

  const hookUrls = getHookUrls();
  for (const url of hookUrls) {
    await fetch(url, { method: "POST", body: post });
  }

  return Response.redirect(getHomepage(req), 303);
}

async function handleAddHook(req: Request) {
  const formData = await req.formData();
  const url = formData.get("url");

  if (typeof url !== "string") {
    return new Response("Invalid `url`", { status: 400 });
  }

  db.query("INSERT INTO Hooks (url) VALUES (?)", [url]);

  console.log(req.url);
  return Response.redirect(getHomepage(req), 303);
}
