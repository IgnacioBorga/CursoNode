const { rejects } = require("assert");
const { resolve } = require("path");

const statusPedido = () => {
    return Math.random() < 0.8;
};

const miPedidoDePizza = new Promise((resolve, rejects) => {
    setTimeout(() => {
        if (statusPedido()) {
            resolve("Pedido exitoso!");
        } else {
            rejects("Ocurrio un error");
        }
    }, 3000);
});

miPedidoDePizza
    //Maneja el exito de la promesa
    .then((msjDeConfirmacion) => {
        console.log(msjDeConfirmacion);
    })
    //Maneja el fracazo de la promesa
    .catch((msjDeError) => {
        console.log(msjDeError);
    });
/**
 * Se pueden armar las funciones por fuera del metodo then|catch, y llamarlas donde corresponda,
 * asi se crearian las funciones manejarConfirmacion() y manejarError(),
 * y se las llamaria desde "miPedidoDePizza.then(manejarConfirmacion).catch(manejarError);"
 */
