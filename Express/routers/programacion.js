const express = require("express");

const routerProgramcion = express.Router();
//La funcion ordenar permite usar query en la URL, al aplicarse al app.get
function ordenar(req, res, resultado) {
    if (req.query.ordenar === "vistas") {
        return res.send(
            JSON.stringify(resultado.sort((a, b) => a.vistas - b.vistas))
        );
    }
    res.send(JSON.stringify(resultado));
}

const { programacion } = require("../data/cursos.js").infoCursos;

routerProgramcion.use(express.json());

routerProgramcion.get("/", (req, res) => {
    res.send(JSON.stringify(programacion));
});

routerProgramcion.get("/:id", (req, res) => {
    const id = req.params.id;
    const resultado = programacion.filter((curso) => curso.id == id);
    if (resultado.length === 0) {
        //se envia el codigo de status y se retorna el valor, para que se detenga la ejecucion de la funcion.
        return res.status(404).send(`No se encontro el curso ${id}`);
    }
    ordenar(req, res, resultado);
});

routerProgramcion.get("/:lenguaje", (req, res) => {
    //req.params.lenguaje hace referencia a :lenguaje de la url.
    const lenguaje = req.params.lenguaje;
    const resultado = programacion.filter(
        (curso) => curso.lenguaje === lenguaje
    );
    if (resultado.length === 0) {
        //se envia el codigo de status y se retorna el valor, para que se detenga la ejecucion de la funcion.
        return res.status(404).send(`No se encontro el curso ${lenguaje}`);
    }
    ordenar(req, res, resultado);
});

//Ejemplo de mas de una variable
routerProgramcion.get("/:lenguaje/:nivel", (req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const resultados = programacion.filter(
        (curso) => curso.lenguaje === lenguaje && curso.nivel === nivel
    );
    if (resultados.length === 0) {
        return res
            .status(404)
            .send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    ordenar(req, res, resultados);
});

routerProgramcion.post("/", (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});

routerProgramcion.put("/:id", (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(programacion));
});

routerProgramcion.patch("/:id", (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = programacion.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        const cursoAModificar = programacion[indice];
        Object.assign(cursoAModificar, infoActualizada);
        // Esta ultima accion actualiza los valores declarados en infoActualizada,
        // en el curso programacion[indice], y devuelve el objeto programacion actualizado
    }
    res.send(JSON.stringify(programacion));
});

routerProgramcion.delete("/:id", (req, res) => {
    const id = req.params.id;
    const indice = programacion.findIndex((curso) => curso.id == id);

    if (indice >= 0) {
        programacion.splice(indice, 1);
    }
    res.send(JSON.stringify(programacion));
});

module.exports = routerProgramcion;
