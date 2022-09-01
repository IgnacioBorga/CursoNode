const http = require("http");

const servidor = http.createServer((req, res) => {
    res.end("Es actualizado?");
});

const PUERTO = 3000;

servidor.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando el puerto ${PUERTO}`);
});
