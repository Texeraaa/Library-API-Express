import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

    static listarAutores = async (req, res, next) => {
        try{
            const autoresResultado = await autores.find();

            res.status(200).json(autoresResultado);
        }catch(erro){
            next(erro);
        }
        
    };

    static listarAutoresPorId = async (req, res, next) => {
        try{
            const id = req.params.id;
        
            const autoresIdResultado = await autores.findById(id);
    
            if(autoresIdResultado !== null){
                res.status(200).send(autoresIdResultado);
            }else{
                next(new NaoEncontrado("ID não encontrado"))
            }
        }catch(erro){
            next(erro)
        }
    };

    static cadastrarAutor = async (req, res, next)=> {
        try{
            let autor = new autores(req.body);
        
            const autorCadastro = await autor.save();

            res.status(201).send(autorCadastro.toJSON());
        }catch(erro){
            next(erro)
        }
    };

    static atualizarAutor = async (req, res, next) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: "Autor atualizado com sucesso"});
        }catch(erro){
            next(erro)
        }
    };

    static excluirAutor = async (req, res, next) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndDelete(id);

            res.status(200).send({message: "Autor removido com sucesso"});
        }catch(erro){
            next(erro)
        }
    };

}

export default AutorController;