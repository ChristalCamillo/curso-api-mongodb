import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

//o express tem hierarquia ao chamar as rotas, então a sequencia importa, da menos complexa pra mais complexa

routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.listarLivrosPorEditora);
routes.get("/livros/:id", LivroController.listarLivrosPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("livros/:id", LivroController.deletarLivro);


export default routes;
