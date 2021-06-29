//#region ejemplo promesas

// function miFunction(a) {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       if (a > 0) {
//         res("Todo bien");
//       } else {
//         rej("Todo mal");
//       }
//     }, 2000);
//   });
// }

// miFunction(10)
//   .then((respuesta) => {
//     console.log(respuesta);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//#endregion

//#region refactorizacion de callbacks en promesas (promise hell)
function sumar(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== "number" || typeof b !== "number") {
        reject("Parametros invalidos suma");
      } else {
        console.info("Tengo la suma, es: " + (a + b));
        resolve(a + b);
      }
    }, 3000);
  });
}

function cuadrado(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== "number") {
        reject("Parametros invalidos cuadrado");
      } else {
        console.info("Tengo el cuadrado, es: " + a * a);
        resolve(a * a);
      }
    }, 4000);
  });
}

function producto(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a !== "number" || typeof b !== "number") {
        reject("Parametros invalidos producto");
      } else {
        console.info("Tengo el producto, es: " + a * b);
        resolve(a * b);
      }
    }, 2000);
  });
}

// sumar(4, 3)
//   .then((suma) => {
//     return cuadrado(suma);
//   })
//   .then((cuad) => {
//     return producto(cuad, 10);
//   })
//   .then((resultado) => {
//     console.info("El resultado es: " + resultado);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//si no, mas resumido:

sumar(4, 3)
  .then((suma) => cuadrado(suma))
  .then((cuad) => producto(cuad, 10))
  .then((resultado) => {
    console.info("El resultado es: " + resultado);
  })
  .catch((error) => {
    console.error(error);
  });

//#endregion

// TAMBIEN EXISTE PROMISE ALL Y PROMISE RACE
//PROMISE ALL: DEVUELVE UNA PROMESA QUE TERMINA CORRECTAMENTE CUANDO TODAS LAS PROMESAS QUE TIENE EN EL ARGUMENTO HAN CONCLUIDO CON EXITO.
//PROMISE RACE: ES UN ARRAY DE PROMESAS, A LA PRIMERA QUE SE TERMINA LE OTORGO EL MANEJADOR
