import express from "express";
import conectaNaDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

//funçõoes relativas a eventos
conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso");
})

//passando todo o conjunto de metodos do express e inicializando dentro de app
const app = express();

//iniciando as rotas, app é a instancia do express
routes(app);

export default app;
