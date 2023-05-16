import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = async(req, res, next) => {

        try{
            throw new Error();


            const procurarLivros = await livros.find()
                .populate("autor")
                .exec();

            res.status(200).json(procurarLivros);
        }catch(erro){
            next(erro)
        }
    };

    static listarLivrosPorId = async(req, res, next) => {
        const id = req.params.id;

        try{
            const procurarLivrosId = await livros.findById(id)
                .populate("autor", "nome")
                .exec();
            res.status(200).send(procurarLivrosId);
        }catch(erro){
            next(erro)
        }
    };

    static cadastrarLivro = async (req, res, next)=> {
        try{
            let livro = new livros(req.body);
        
            const livroCadastro = await livro.save();

            res.status(201).send(livroCadastro.toJSON());
        }catch(erro){
           next(erro)
        }
    };

    static atualizarLivro = async(req, res, next) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Livro atualizado com sucesso"});
        }catch(erro){
            next(erro)
        }
    
    };

    static excluirLivro = async (req, res, next) => {
        const id = req.params.id;

        try{
            await livros.findByIdAndDelete(id);
            res.status(200).send({message: "livro removido com sucesso"});
        }catch(erro){
            next(erro)
        }   
    };

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;
    
            const livrosResultado = await livros.find({"editora": editora});
    
            res.status(200).send(livrosResultado);
        } catch (erro) {
            next(erro)
        }
    };
}

export default LivroController;