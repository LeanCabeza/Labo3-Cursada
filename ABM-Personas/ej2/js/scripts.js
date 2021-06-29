import Persona from "../personas.js";

let boton = null;
let idSeleccionado = "";

const personas = JSON.parse(localStorage.getItem("lista")) || [];

window.addEventListener("DOMContentLoaded", ()=>{

    document.forms[0].addEventListener("submit", handlerSubmit);

    // boton = document.getElementById("btnLista");

    document.addEventListener("click", handlerClick);

    //boton.addEventListener("click", handlerLoadList);

    if(personas.length > 0){
        handlerLoadList(personas);
    }
});

function handlerLoadList(e){
    renderizarLista(crearTabla(personas), document.getElementById("divLista"));
}


function handlerDeleteList(e){
    renderizarLista(null,document.getElementById("divLista"));
    const emisor = e.target;
    emisor.textContent = "Cargar Lista";
    emisor.removeEventListener("click",handlerDeleteList);
    emisor.addEventListener("click",handlerLoadList);

}

function renderizarLista(lista, contenedor){

    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstChild);
    }

    if(lista){
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

function crearTabla(items){

    const tabla = document.createElement("table");

    tabla.appendChild(crearThead(items[0]));

    tabla.appendChild(crearTbody(items));

    return tabla;
}

function crearThead(item){
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "blue";

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
        //console.log(id);
        cargarFormulario(idSeleccionado);
        
    }else if (e.target.matches("#btnEliminar")) {
        let id = document.forms[0].id.value;

        if (confirm("Confirma la eliminacion ?")){

            agregarSpinner();
            setTimeout(()=>{

                let index = personas.findIndex((el)=>el.id ==id);
                personas.splice(index,1);
                almacenarDatos(personas); 
              
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
        const personaEditada = new Persona(
            parseInt(frm.id.value),
            frm.nombre.value,
            frm.email.value,
            frm.sexo.value
        );
        
        if (confirm("Confirma Modificacion?")){
            agregarSpinner();
            setTimeout(()=>{
                modificarPersona(personaEditada);
                eliminarSpinner();
            },2000);
        }

    }else if (  document.getElementById("btnSubmit").value = "Alta Persona"){
        console.log("Dando de alta");

        const nuevaPersona = new Persona(
            Date.now(),
            frm.nombre.value,
            frm.email.value,
            frm.sexo.value
        );

            agregarSpinner();
            setTimeout(()=>{
                altaPersona(nuevaPersona);
                eliminarSpinner();
            },2000);

        }
        limpiarFormulario(e.target);
}


function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner(){
    document.getElementById("spinner-container").innerHTML="";
}



function altaPersona(p){
    personas.push(p);
    almacenarDatos(personas);
}

function  modificarPersona(p){
    let index = personas.findIndex((per)=>{
        return per.id == p.id;
    });

    personas.splice(index , 1 , p);
    almacenarDatos(personas);
}

function almacenarDatos(data){
    localStorage.setItem("lista",JSON.stringify(data));
    handlerLoadList();
}

function limpiarFormulario(frm){
    frm.reset();
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnSubmit").value = "Alta Persona";

    document.forms[0].id.value = "" ;
}

function cargarFormulario(id){

    let Persona = null;

    const frm = document.forms[0];
    
    Persona = personas.filter((p) => p.id == parseInt(id))[0];

    frm.id.value = Persona.id;
    frm.nombre.value = Persona.nombre;
    frm.email.value = Persona.email;
    frm.sexo.value = Persona.sexo;


    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("oculto");
}