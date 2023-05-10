import autores from "../models/Autor.js";

class AutorController {

    static listarAutores = async (req, res) => {
        try{
            const autoresResultado = await autores.find();

            res.status(200).json(autoresResultado);
        }catch(erro){
            res.status(500).json({message: "Erro interno no servidor"});
        }
        
    };

    static listarAutoresPorId = async (req, res) => {
        const id = req.params.id;

        try{
            const autoresIdResultado = await autores.findById(id);
    
            res.status(200).send(autoresIdResultado);
        }catch(erro){
            res.status(400).send({message: `${erro.message} - ID do Autor não localizada`});
        }
    };

    static cadastrarAutor = async (req, res)=> {
        let autor = new autores(req.body);

        try{
            const autorCadastro = await autor.save();

            res.status(201).send(autorCadastro);
        }catch(erro){
            res.status(500).send({message: `${erro.message} - falha ao cadastar Autor.`});
        }
    };

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndUpdate(id, {$set: req.body});

            res.status(200).send({message: "Autor atualizado com sucesso"});
        }catch(erro){
            res.status(500).send({message:  `${erro.message} - falha ao atualizar`});
        }
    };

    static excluirAutor = async (req, res) => {
        const id = req.params.id;

        try{
            await autores.findByIdAndDelete(id);

            res.status(200).send({message: "Autor removido com sucesso"});
        }catch(erro){
            res.status(500).send({message: erro.message});
        }
    };

}

export default AutorController;