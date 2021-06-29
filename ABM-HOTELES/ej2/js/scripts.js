import Propiedad     from "../propiedad.js";

let idSeleccionado = "";

const propiedades = JSON.parse(localStorage.getItem("lista")) || [];

window.addEventListener("DOMContentLoaded", ()=>{

    document.forms[0].addEventListener("submit", handlerSubmit);

    document.addEventListener("click", handlerClick);


    if(propiedades.length > 0){
        handlerLoadList(propiedades);
    }

});

// No tocar


function handlerLoadList(e){
    renderizarLista(crearTabla(propiedades), document.getElementById("divLista"));
}

// No tocar


function renderizarLista(lista, contenedor){

    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    if(lista){
       contenedor.appendChild(lista); 
    }
}

// No tocar


function crearTabla(items){

    const tabla = document.createElement("table");

    tabla.appendChild(crearThead(items[0]));

    tabla.appendChild(crearTbody(items));

    return tabla;
}

// No tocar


function crearThead(item){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    tr.style.backgroundColor = "lightblue";

    for(const key in item){
        if (key !== "id"){
        const th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);  
        }    
    }
    thead.appendChild(tr);
    return thead;
}

// No tocar

function crearTbody(items){
    const tbody = document.createElement("tbody");
    items.forEach(item=>{
        const tr = document.createElement("tr");
        
        for(const key in item){
            if (key == "id"){
                tr.setAttribute("data-id",item[key]);
            }else{
                const td = document.createElement("td");
                td.textContent = item[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

function handlerClick(e){

    if(e.target.matches("td")){
        let id = e.target.parentNode.dataset.id;
        idSeleccionado = id;
        console.log("EL ID SELECCIONADO ES : " + id);
        cargarFormulario(idSeleccionado);
        
    }else if (e.target.matches("#btnEliminar")) {
        let id = document.forms[0].id.value;

        if (confirm("Confirma la eliminacion ?")){

            agregarSpinner();
            setTimeout(()=>{

                let index = propiedades.findIndex((el)=>el.id ==id);
                propiedades.splice(index,1);
                almacenarDatos(propiedades); 
              
                eliminarSpinner();
            },2000);
            
        }

        limpiarFormulario(document.forms[0]);
    }
}


function handlerSubmit(e){
    e.preventDefault();
    const frm = e.target;

    if(  document.getElementById("btnSubmit").value == "Modificar"){
        const propiedadEditada = new Propiedad(
            parseInt(frm.id.value),
            frm.titulo.value,
            frm.transaccion.value,
            frm.descripcion.value,
            frm.precio.value,
            frm.baños.value,
            frm.num_estacionamiento.value,
            frm.num_dormitorio.value
        );
        
        if (confirm("Confirma Modificacion?")){
            agregarSpinner();
            setTimeout(()=>{
                modificarPropiedad(propiedadEditada);
                eliminarSpinner();
            },2000);
        }

    }else if (  document.getElementById("btnSubmit").value = "Guardar"){

        console.log("Dando de alta");

        const nuevaPropiedad = new Propiedad(
            Date.now(),
            frm.titulo.value,
            frm.transaccion.value,
            frm.descripcion.value,
            frm.precio.value,
            frm.baños.value,
            frm.num_estacionamiento.value,
            frm.num_dormitorio.value
        );

            agregarSpinner();
            setTimeout(()=>{
                altaPropiedad(nuevaPropiedad);
                eliminarSpinner();
            },2000);

        }
        limpiarFormulario(e.target);
}


// No tocar


function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}

// No tocar

function eliminarSpinner(){
    document.getElementById("spinner-container").innerHTML="";
}

function altaPropiedad(p){
    propiedades.push(p);
    almacenarDatos(propiedades);
}

function  modificarPropiedad(p){
    let index = propiedades.findIndex((prop)=>{
        return prop.id == p.id;
    });

    propiedades.splice(index , 1 , p);
    almacenarDatos(propiedades);
}

// No tocar


function almacenarDatos(data){
    localStorage.setItem("lista",JSON.stringify(data));
    handlerLoadList();
}



function limpiarFormulario(frm){
    frm.reset();
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Guardar";

    document.forms[0].id.value = "" ;
}



function cargarFormulario(id){

    let Propiedad = null;

    const frm = document.forms[0];
    
    Propiedad = propiedades.filter(p => p.id == id)[0];

    frm.id.value = Propiedad.id;
    frm.titulo.value = Propiedad.titulo;
    frm.transaccion.value = Propiedad.transaccion;
    frm.descripcion.value = Propiedad.descripcion;
    frm.precio.value = Propiedad.precio;
    frm.baños.value = Propiedad.num_wc;
    frm.num_estacionamiento.value = Propiedad.num_estacionamiento;
    frm.num_dormitorio.value = Propiedad.num_dormitorio;


    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
}
