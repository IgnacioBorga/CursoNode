const express = require("express");
const app = express();

const { infoCursos } = require("./data/cursos.js");

//Routers
const routerProgramcion = require("./routers/programacion.js");
const routerMatematica = require("./routers/matematicas.js");

app.use("/api/cursos/programacion", routerProgramcion);
app.use("/api/cursos/matematica", routerMatematica);

//Routing

app.get("/", (req, res) => {
    res.send("Primer servidor con express!!");
});

app.get("/api/cursos", (req, res) => {
    res.send(infoCursos);
});

// process.env.PORT toma el puerto que se asigna al servidor una vez creado en produccion.
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando el puerto ${PUERTO}...`);
});
