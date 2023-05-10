import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async(req, res) => {

        try{
            const procurarLivros = await livros.find()
                .populate("autor")
                .exec();

            res.status(200).json(procurarLivros);
        }catch(erro){
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    };

    static listarLivrosPorId = async(req, res) => {
        const id = req.params.id;

        try{
            const procurarLivrosId = await livros.findById(id)
                .populate("autor", "nome")
                .exec();
            res.status(200).send(procurarLivrosId);
        }catch(erro){
            res.status(400).send({message: `${erro.message} - ID do Livro não localizada`});
        }
    };

    static cadastrarLivro = async (req, res)=> {
        let livro = new livros(req.body);

        try{
            const livroCadastro = await livro.save();

            res.status(201).send(livroCadastro);
        }catch(erro){
            res.status(500).send({message: `${erro.message} - falha ao cadastar livro.`});
        }
    };

    static atualizarLivro = async(req, res) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso"});
        }catch(erro){
            res.status(500).send({message: erro.message});
        }
    
    };

    static excluirLivro = async (req, res) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndDelete(id);
            res.status(200).send({message: "livro removida com sucesso"});
        }catch(erro){
            res.status(500).send({message: erro.message});
        }   
    };

    static listarLivroPorEditora = async (req, res) => {
        try {
            const editora = req.query.editora;
    
            const livrosResultado = await livros.find({"editora": editora});
    
            res.status(200).send(livrosResultado);
        } catch (erro) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    };
}

export default LivroController;