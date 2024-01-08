import express from "express";
import conectaNaDatabase from "./config/dbconnect.js";

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
//middleware. pro express ter acesso e alterar as requisições, no caso esse serve pra parcear (converter) expressoes pra json
//isso é necessário pq os dados de body chegam como strings
app.use(express.json());

const livros = [
    {
        id: 1,
        título: "O Senhor dos Anéis"
    },
    {
        id: 2,
        título: "O Hobbit"
    }
];

function buscaLivro(id) {
	return livros.findIndex(livros => {
		return livros.id === Number(id);
	})
}


//passando para o express a responsabilidade de gerenciar as rotas para escalabilidade
app.get("/", (req, res) => {
	res.status(200).send("Curso de node.js");
});

app.get("/livros", (req, res) => {
  res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
	res.status(201).send("livro cadastrado com sucesso!")
});

//o : informa ao express que o parametro varia
app.get("/livros/:id", (req, res) => {
	const index = buscaLivro(req.params.id);
	res.status(200).json(livros[index]);
});

//alterar um registro
app.put("/livros/:id", (req, res) => {
	const index = buscaLivro(req.params.id);
	livros[index].título = req.body.título; 	
	res.status(200).json(livros);
});

//deletar livros
app.delete('/livros/:id', (req, res) => {
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("livro deletado");
});



export default app;
