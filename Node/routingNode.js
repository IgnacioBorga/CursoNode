const http = require("http");
const cursos = require("./cursos");

const servidor = http.createServer((req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            return manejarSolicitudGet(req, res);
        case "POST":
            return manejarSolicitudPost(req, res);
        default:
            res.statusCode = 501;
            res.end(
                `El metodo ${method} no puede ser utilizado por el servidor`
            );
    }
});

function manejarSolicitudGet(req, res) {
    const path = req.url;
    if (path === "/") {
        return res.end(
            "Bienvenidos a mi primer servidor y API creados con Node"
        );
    } else if (path === "/cursos") {
        return res.end(JSON.stringify(cursos.infoCursos));
    } else if (path === "/cursos/programacion") {
        return res.end(JSON.stringify(cursos.infoCursos.programacion));
    }
    res.statusCode = 404;
    return res.end("404 - Not Found");
}

function manejarSolicitudPost(req, res) {
    const path = req.url;

    if (path === "/cursos/programacion") {
        return res.end(
            "El servidor recibio la solicitud de POST para programacion"
        );
    }
}

const PUERTO = 3000;
servidor.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
});
