export function getProdPort() {
  const prodPort = Deno.env.get("PORT");
  return prodPort ? parseInt(prodPort) : undefined;
}

export function getHostname() {
  const hasProdPort = !!getProdPort();
  return hasProdPort ? "0.0.0.0" : "localhost";
}

export function getHomepage(req: Request) {
  const prodDomain = Deno.env.get("RAILWAY_PUBLIC_DOMAIN");
  const origin = prodDomain ? `https://${prodDomain}` : new URL(req.url).origin;
  return origin;
}
