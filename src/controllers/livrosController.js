import {autores, livros} from "../models/index.js";

class LivroController {

    static listarLivros = async(req, res, next) => {

        try{
            const buscaLivros = livros.find();
            
            req.resultado = buscaLivros;

            next();
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

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBusca(req.query);

            if (busca !== null){
                const livrosResultado = livros
                .find(busca)
                .populate("autor")

                req.resultado = livrosResultado

                next()

            }else{
                res.status(200).send([]);
            }
    
        } catch (erro) {
            next(erro);
        }
    };
}

async function processaBusca(params){
    const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

        // const regex = new RegExp(titulo, "i")

        let  busca = {};

        if (editora) busca.editora = editora;
        if (titulo) busca.titulo = { $regex: titulo, $options: "i"};

        if (minPaginas || maxPaginas) busca.numeroPaginas = {}

        if (minPaginas) busca.numeroPaginas.$gte = minPaginas
        if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas

        if(nomeAutor){
            const autor = await autores.findOne({ nome: nomeAutor })
            
            if(autor !== null){
                busca.autor = autor._id;
            }else{
                busca = null;
            }
        }

        return busca;
}

export default LivroController;