// import http from "http";
import app from "./src/app.js"

const PORT = 3000;

// funçao interna de create server depreciada em função do uso do express
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end(rotas[req.url]);
// });

app.listen(PORT, () => {
  console.log("servidor escutando!");
});

