const http = require("http");

const PORT = 3000;

http.createServer((req, res) => {
  res.end("CI demo OK\n");
}).listen(PORT, () => {
  console.log("Server running on port", PORT);
});