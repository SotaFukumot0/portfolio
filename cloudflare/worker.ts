export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    const key = url.pathname.replace(/^\/unity\//, "Unity/");

    const object = await env.unity_builds.get(key);
    if (!object) return new Response("Not found", { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata?.(headers);

    // 常に許可するオリジンを設定（CORS）
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Vary", "Origin");

    headers.set("Content-Type", object.httpMetadata?.contentType || "application/octet-stream");
    headers.set("Cross-Origin-Opener-Policy", "same-origin");
    headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    headers.set("Cross-Origin-Resource-Policy", "cross-origin");
    headers.set("Cache-Control", "max-age=86400");

    return new Response(object.body, { headers });
  },
};
