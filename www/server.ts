Deno.serve(async (req) => {
  const { pathname } = new URL(req.url);
  switch (pathname) {
    case "/":
      return await handleIndex();
    case "/build-hook":
      return await handleBuildHook(req);
    default:
      return new Response("Not found", { status: 404 });
  }
});

async function handleIndex() {
  try {
    const response = await Deno.readTextFile(
      new URL("./built.html", import.meta.url)
    );
    return new Response(response, { headers: { "Content-Type": "text/html" } });
  } catch {
    return new Response("Page not built yet!", { status: 400 });
  }
}

async function handleBuildHook(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || typeof body !== "string") {
    return new Response("Invalid `title` or `body`", { status: 400 });
  }

  const template = await Deno.readTextFile(
    new URL("./template.html", import.meta.url)
  );
  const writeContents = template
    .replace("%%TITLE%%", title)
    .replace("%%BODY%%", body);

  await Deno.writeTextFile(
    new URL("./built.html", import.meta.url),
    writeContents
  );

  const homepage = new URL(req.url).origin;
  return Response.redirect(homepage, 303);
}
