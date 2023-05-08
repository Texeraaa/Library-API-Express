import express from "express";
import AutorController from "../controllers/autroresController.js";

const router = express.Router();

router
    .get("/autores", AutorController.listarAutores)
    .get("/autores/:id", AutorController.listarAutoresPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor)
    .delete('/autores/:id', AutorController.excluirAutor)
    
export default router;