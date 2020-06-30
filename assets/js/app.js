/*

 Variables

*/
const listaTareas = document.getElementById('lista-tweets');

/*

 Event Listeners

*/
addEventListeners();

function addEventListeners() {
    /*
     Se genera un evento cuando se pulsa sobre el botón con id 'formulario' de tipo submit
     y ese evento llama a la funcion agregarTarea.
     
     De igual modo se genera un evento si se pulsa sobre el elemento de la clase borrar-tarea
     usando delegation, es decir, se pulsa sobre listaTareas, que es un div, y luego se comprueba
     dentro del div hemos pulsado sobre la clase borrar-tarea
    */

    // Agregar tareas
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);

    // Borrar tareas
    listaTareas.addEventListener('click', borrarTarea);
}

/*

 Funciones del programa

*/

// Función agregarTarea: tomará el valor del campo textarea con id tweet y lo añadirá al localStorage
function agregarTarea(e) {
    // Cancelo cualquier elemento si es cancelable
    e.preventDefault();
    // Leer el valor del textarea
    const tarea = document.getElementById('tweet').value;
    // Crear botón de eliminar tarea
    const botonBorrar = document.createElement('a');
    // Añadir al botón una clase que se llama 'borrar-tarea'
    botonBorrar.classList = 'borrar-tarea';
    // Y añadirle al dicho elemento de enlace el valor de 'X'
    botonBorrar.innerText = ' X';
    // Crear elemento y añadirle el contenido a una lista
    const li = document.createElement('li');
    // Añadir al elemento de la lista el valor del campo tarea
    li.innerText = tarea;
    // Una vez añadido el texto se añade también al elemento de la lista el botón
    li.appendChild(botonBorrar);
    // Añadir al div con id 'lista-tweets' el elemento de la lista para que se muestre por pantalla
    listaTareas.appendChild(li);
}

// Función de borrar tareas
function borrarTarea(e) {
    // Cancelo cualquier elemento si es cancelable
    e.preventDefault();
    // Compruebo si el elemento sobre el que estoy haciendo click es de la clase 'borrar-tarea'
    if (e.target.className === 'borrar-tarea') {
        // Si lo es tomamos el elemento anterior, que es <li></li> y lo eliminio
        console.log(e.target.parentElement.remove());
        // Aviso al usuario
        alert('Tarea eliminada');
    }    
}