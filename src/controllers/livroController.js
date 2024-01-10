import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

//classe que guarda todas as operaçoes possiveis de realizar na api livraria

class LivroController {
	//static: possibilita chamar o metodo sem instanciar a classe
	static async listarLivros(req, res) {
		try{
					//find: metodo do mongoose, como não passamos nenhuma spec vai retornar tudo
		const listaLivros = await livro.find({});
		res.status(200).json(listaLivros);
		}catch{
			res.status(500).json({ message: `${erro.message} - falha na requisição` });
		}
	};

	
  static async cadastrarLivro (req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado }};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

	static async listarLivrosPorId (req, res) {
		try {
			const id = req.params.id;
			const livroEncontrado = await livro.findById(id);
			res.status(200).json(livroEncontrado);
		}catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
	};

	 static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  	 static async deletarLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro deletado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

  static async listarLivrosPorEditora(req,res) {
	const editora = req.query.editora;
	try {
		const livrosPorEditora = await livro.find({editora: editora});
		res.status(200).json(livrosPorEditora);
	}catch(erro) {
		res.status(500).json({ message: `${erro.message} - falha na busca` });
	}
  }
};



export default LivroController;