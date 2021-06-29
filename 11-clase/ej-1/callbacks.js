//#region primer ejemplo - Bloqueante

function sumar(a, b) {
  return a + b;
}

function cuadrado(a) {
  return a * a;
}

function producto(a, b) {
  return a * b;
}

// esto es un codigo bloqueante, ya que sumar se va a ejecutar, y recien cuando se complete es que se va a pasar a la siguiente linea
let suma = sumar(4, 3);
let cuad = cuadrado(suma);
let resultado = producto(cuad, 10);

console.log(resultado);

//#endregion

//#region demostracion asincronismo hardcodeado

console.log("Inicio");

setTimeout(() => {
  console.log("Pasaron 2 segundos");
}, 2000);

console.log("Fin");

//#endregion

//#region Asincronismo hardcodeado con funciones

function sumar(a, b) {
  let suma;

  setTimeout(() => {
    console.log("Tengo el resultado de la suma");
    suma = a + b;
  }, 1500);
  return suma;
}

function cuadrado(a) {
  let cuad;

  setTimeout(() => {
    console.log("Tengo el resultado del cuadrado");
    cuad = a * a;
  }, 1000);
  return cuad;
}

function producto(a, b) {
  let prod;

  setTimeout(() => {
    console.log("Tengo el resultado del producto");
    prod = a * b;
  }, 1750);
  return prod;
}

let suma = sumar(4, 3);
let cuad = cuadrado(suma);
let resultado = producto(cuad, 10);

console.log(resultado);

//#endregion

//#region solucion con callbacks (callback hell)

function sumar(a, b, callback) {
  setTimeout(() => {
    try {
      if (typeof a !== "number" || typeof b !== "number") {
        throw "parametros invalidos para la suma";
      } else {
        let suma;

        console.log("Tengo el resultado de la suma");
        suma = a + b;
        callback(suma);
      }
    } catch (error) {
      console.error(error);
    }
  }, 3000);
}

function cuadrado(a, callback) {
  setTimeout(() => {
    try {
      if (typeof a !== "number") {
        throw "parametros invalidos para el cuadrado";
      } else {
        let cuad;

        console.log("Tengo el resultado del cuadrado");
        cuad = a * a;
        callback(cuad);
      }
    } catch (error) {
      console.error(error);
    }
  }, 4000);
}

function producto(a, b, callback) {
  setTimeout(() => {
    try {
      if (typeof a !== "number" || typeof b !== "number") {
        throw "parametros invalidos para el producto";
      } else {
        let prod;

        console.log("Tengo el resultado del producto");
        prod = a * b;
        callback(prod);
      }
    } catch (error) {
      console.error(error);
    }
  }, 3000);
}

//esto se conoce como callback hell, y se vuelve dificil de leer, mantener, y escribir

sumar(4, 3, (s) => {
  cuadrado(s, (c) => {
    producto(c, 10, (p) => {
      console.log("El resultado es: " + p);
    });
  });
});

console.log("ESTO SE MUESTRA PORQUE LO ANTERIOR NO ES BLOQUEANTE");

//#endregion
