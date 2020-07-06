import * as Eventos from './events.js';

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
    document.querySelector('#formulario').addEventListener('submit', Eventos.agregarTarea);

    // Borrar tareas
    Eventos.listaTareas.addEventListener('click', Eventos.borrarTarea);

    // Cargar contenido cargado en el LocalStorage, este evento ('DOMContentLoaded') carga cuando toda la página ha cargado y está lista
    document.addEventListener('DOMContentLoaded', Eventos.localStorageListo);
}