import { mongoose } from "mongoose";

const livroSchema = new mongoose.Schema({
	//tipo do mongoose pra criar ids unicos
  id: { type: mongoose.Schema.Types.ObjectId },
  //required: true pra propriedade obrigatoria
  titulo: { type: String, required: true },
  editora: { type: String },
  preco: { type: Number },
  paginas: { type: Number }
  //sem versionamento pra facilitar
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;