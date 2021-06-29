import {marcas} from "../marcas.js";
let boton = null ;
window.addEventListener("DOMContentLoaded",()=>{
    boton= document.getElementById("btnLista");
    boton.addEventListener("click",handlerLoadList)
})

function handlerLoadList(e){
    renderizarLista(crearLista(marcas),document.getElementById("divLista"));
    const emisor = e.target;
    emisor.textContent = "Eliminar Lista";
    emisor.removeEventListener("click",handlerLoadList);
    emisor.addEventListener("click",handlerDeleteList);
}


function handlerDeleteList(e){
    renderizarLista(null,document.getElementById("divLista"));
    const emisor = e.target;
    emisor.textContent = "Cargar Lista";
    emisor.removeEventListener("click",handlerDeleteList);
    emisor.addEventListener("click",handlerLoadList);

}

function renderizarLista(lista,contenedor){

    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    if (lista){
        contenedor.appendChild(lista);
    }

}


function crearLista(items){
    const lista = document.createElement("ul");
    items.forEach(element => {
        const li = document.createElement("li");
        const contenido = document.createTextNode(element.marca);
        li.appendChild(contenido);
        lista.appendChild(li);
    });

    return lista;
}

