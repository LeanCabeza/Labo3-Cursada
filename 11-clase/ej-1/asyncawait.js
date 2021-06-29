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

//#region maneras de declarar la funcion asincrona
// async function realizarOperaciones(){

// }

// const realizarOp = async ()=>{

// }

//#endregion

const realizarOperaciones = async () => {
  try {
    let suma = await sumar(4, 3);
    let cuad = await cuadrado(suma);
    let resultado = await producto(cuad, 10);
    console.info(resultado);
  } catch (error) {
    console.error(error);
  }
};

realizarOperaciones();
