import {autor} from "../models/Autor.js";

//classe que guarda todas as operaçoes possiveis de realizar na api livraria

class AutorController {
	//static: possibilita chamar o metodo sem instanciar a classe
	static async listarAutores(req, res) {
		try{
					//find: metodo do mongoose, como não passamos nenhuma spec vai retornar tudo
		const listaAutores = await autor.find({});
		res.status(200).json(listaAutores);
		}catch{
			res.status(500).json({ message: `${erro.message} - falha na requisição` });
		}
	};

	static async listarAutoresPorId (req, res) {
		try {
			const id = req.params.id;
			const autorEncontrado = await autor.findById(id);
			res.status(200).json(autorEncontrado);
		}catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do autor` });
    }
	};

	 static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  };

  	 static async deletarAutor (req, res) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor deletado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

	static async cadastrarAutor(req, res) {
		try {
			const novoAutor = await autor.create(req.body);
			res.status(201).json({
				message: "criado com sucesso!",
				autor: novoAutor
			});
		} catch (erro) {
			res.status(500).json({
				message: `${erro.message} 
			- FALHA ao cadastrar autor`});
		}
	}
};



export default AutorController;