const express = require("express");

const routerMatematica = express.Router();

routerMatematica.use(express.json());

//La funcion ordenar permite usar query en la URL, al aplicarse al app.get
function ordenar(req, res, resultado) {
    if (req.query.ordenar === "vistas") {
        return res.send(
            JSON.stringify(resultado.sort((a, b) => a.vistas - b.vistas))
        );
    }
    res.send(JSON.stringify(resultado));
}

const { matematica } = require("../data/cursos.js").infoCursos;

routerMatematica.get("/", (req, res) => {
    res.send(JSON.stringify(matematica));
});

routerMatematica.get("/:tema", (req, res) => {
    const tema = req.params.tema;
    const resultado = matematica.filter((curso) => curso.tema === tema);

    if (resultado.length === 0) {
        return res.status(404).send(`No se encontro curso de ${tema}`);
    }
    ordenar(req, res, resultado);
});

routerMatematica.post("/", (req, res) => {
    let cursoNuevo = req.body;
    matematica.push(cursoNuevo);
    res.send(JSON.stringify(matematica));
});

routerMatematica.put("/:id", (req, res) => {
    const cursoActualizado = req.body;
    const id = req.params.id;

    const indice = matematica.findIndex((curso) => curso.id == id);

    if (indice >= 0) {
        matematica[indice] = cursoActualizado;
    }
    res.send(JSON.stringify(matematica));
});

routerMatematica.patch("/:id", (req, res) => {
    const infoActualizada = req.body;
    const id = req.params.id;

    const indice = matematica.findIndex((curso) => curso.id == id);
    if (indice >= 0) {
        const cursoAModificar = matematica[indice];
        Object.assign(cursoAModificar, infoActualizada);
        // Esta ultima accion actualiza los valores declarados en infoActualizada,
        // en el curso matematica[indice], y devuelve el objeto matematica actualizado
    }
    res.send(JSON.stringify(matematica));
});

routerMatematica.delete("/:id", (req, res) => {
    const id = req.params.id;
    const indice = matematica.findIndex((curso) => curso.id == id);

    if (indice >= 0) {
        matematica.splice(indice, 1);
    }
    res.send(JSON.stringify(matematica));
});

module.exports = routerMatematica;
