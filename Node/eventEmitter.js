const EventEmitter = require("events");

const emisorProductos = new EventEmitter();

/**
 * Se le conoce como Event Handler
 */
emisorProductos.on("compra", (total, cantidad) => {
    console.log(`Se realizo una compra por $ ${total}`);
    console.log(`Cantidad de productos: ${cantidad}`);
});

emisorProductos.emit("compra", 500, 12);
