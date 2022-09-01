/**
 * Se conoce como promesa al "OBJETO de JS" que representa el eventual resultado (o error)
 * de una operacion asincrona.
 * Este objeto se asocia a una Callback Function.
 */
const promesa = false;

const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (promesa) {
            resolve("promesa cumplida!");
        } else {
            reject("promesa rechazada!");
        }
    }, 3000);
});

const promesaCumplida = (valor) => {
    console.log(valor);
};

const promesaRechazada = (razon) => {
    console.log(razon);
};

miPromesa.then(promesaCumplida, promesaRechazada);
