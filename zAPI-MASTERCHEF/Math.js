const sumar = (a,b)=>{
    return a+b;
};
const restar = (a,b)=>{
    return a-b;
};
const multiplicar = (a,b)=>{
    return a*b;
};
const dividir = (a,b)=>{
    if(!validarCero(b)){
        return a/b;
    }
    return NaN;
};

const validarCero = (a) =>( a === 0 ? 1 : 0);

exports.sumar = sumar ;
exports.restar = restar ;
exports.multiplicar = multiplicar ;
exports.dividir = dividir ;
