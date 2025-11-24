// Minimal placeholder dev server for environments (like Freestyle) where the default
// `npm run dev` must not fail under the default Node 18 image.
//
// This server does NOT start Next.js or Mastra. It just serves a small HTML page
// explaining how to upgrade Node / npm and run the real dev servers manually.

const http = require("http");

const PORT = process.env.PORT || 3000;

const message = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mastra Assistant UI Template</title>
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 2rem; max-width: 720px; margin: 0 auto; line-height: 1.5; }
      code { background: #f3f3f3; padding: 0.1rem 0.3rem; border-radius: 4px; }
      pre { background: #f3f3f3; padding: 0.75rem 1rem; border-radius: 6px; overflow-x: auto; }
      h1 { font-size: 1.5rem; margin-bottom: 1rem; }
    </style>
  </head>
  <body>
    <h1>Mastra + Assistant UI Template</h1>
    <p>
      This is a placeholder dev server used when the default <code>npm run dev</code>
      command is executed in environments where the Node version is too old for the
      full Next.js + Mastra dev setup.
    </p>
    <p>
      To run the real application locally or after upgrading Node in your sandbox,
      use the following commands from the project root:
    </p>
    <pre><code>npm install       # or pnpm install
npm run dev:mastra
npm run dev:ui</code></pre>
    <p>
      This will start:
    </p>
    <ul>
      <li>Mastra server on <code>http://localhost:4111</code></li>
      <li>Next.js + Assistant UI on <code>http://localhost:3000</code></li>
    </ul>
  </body>
</html>`;

const server = http.createServer((_, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(message);
});

server.listen(PORT, () => {
  console.log(`Placeholder dev server listening on http://localhost:${PORT}`);
});
