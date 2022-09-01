const { error } = require("console");

function ordenarProducto(producto) {
    return new Promise((resolve, reject) => {
        console.log(`Ordenando: ${producto}, por favor espere.`);
        setTimeout(() => {
            if (producto === "taza") {
                resolve("Ordenando una taza...");
            } else {
                reject("Este producto no esta disponible actualmente.");
            }
        }, 2000);
    });
}

function procesarPedido(respuesta) {
    return new Promise((resolve, reject) => {
        console.log("Procesando pedido...");
        console.log(`La respuesta fue: ${respuesta}`);
        setTimeout(() => {
            resolve("Gracias por tu compra!!");
        }, 4000);
    });
}

// ordenarProducto("taza")
//     .then((respuesta) => {
//         console.log("Respuesta recibida.");
//         console.log(respuesta);
//         return procesarPedido(respuesta);
//     })
//     .then((respuestaProcesada) => {
//         console.log(respuestaProcesada);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

async function realizarPedido(producto) {
    try {
        const respuesta = await ordenarProducto(producto);
        const respuestaProcesada = await procesarPedido(respuesta);
        console.log(respuestaProcesada);
    } catch (error) {
        console.log(error);
    }
}

realizarPedido("lapiz");
