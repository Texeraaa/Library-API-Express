import express from "express";
import AutorController from "../controllers/autroresController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/autores", AutorController.listarAutores, paginar)
    .get("/autores/:id", AutorController.listarAutoresPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor)
    .delete("/autores/:id", AutorController.excluirAutor);
    
export default router;