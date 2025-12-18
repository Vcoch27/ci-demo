const http = require("http");

const PORT = 3001;

function send(res, status, body, type = "text/html; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": "no-store",
  });
  res.end(body);
}

const html = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CI Demo</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin:0; background:#0b1220; color:#e6edf3; }
    .wrap { max-width: 860px; margin: 0 auto; padding: 48px 20px; }
    .card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 16px; padding: 22px; }
    h1 { margin: 0 0 10px; font-size: 28px; }
    .ok { display:inline-block; padding:6px 10px; border-radius: 999px; background:#0ea5e9; color:#001018; font-weight:700; }
    .row { display:flex; gap:12px; flex-wrap:wrap; margin-top: 14px; }
    .chip { padding:10px 12px; border-radius: 12px; background: rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.12); }
    a { color:#7dd3fc; text-decoration:none; }
    a:hover { text-decoration:underline; }
    code { background: rgba(0,0,0,.35); padding: 2px 6px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="ok">CI DEMO OK</div>
      <h1>Server đang chạy</h1>
      <p>Trang này dùng để demo deploy qua CI/CD (daemon + job_wrapper + PM2).</p>

      <div class="row">
        <div class="chip">Port: <code>${PORT}</code></div>
        <div class="chip">Time: <code id="t">...</code></div>
        <div class="chip">Health: <a href="/health">/health</a></div>
      </div>

      <p style="opacity:.85;margin-top:16px">
        Tip: nếu bạn bật UFW/SG, nhớ mở port <code>${PORT}</code>.
      </p>
    </div>
  </div>

  <script>
    document.getElementById("t").textContent = new Date().toLocaleString();
    setInterval(() => document.getElementById("t").textContent = new Date().toLocaleString(), 1000);
  </script>
</body>
</html>`;

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/" || url.pathname === "/index.html") {
    return send(res, 200, html, "text/html; charset=utf-8");
  }

  if (url.pathname === "/health") {
    return send(res, 200, "CI demo hahahah\n", "text/plain; charset=utf-8");
  }

  return send(res, 404, "Not Found\n", "text/plain; charset=utf-8");
}).listen(PORT, () => {
  console.log("Server running on port", PORT);
});
