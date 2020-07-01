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

    // Cargar contenido cargado en el LocalStorage, este evento ('DOMContentLoaded') carga cuando toda la página ha cargado y está lista
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

/*

 Funciones del programa

*/

// Función agregarTarea: tomará el valor del campo textarea con id tweet y lo añadirá al localStorage
function agregarTarea(e) {
    // Cancelo cualquier elemento si es cancelable
    e.preventDefault();
    // Leer el valor del textarea
    const tarea = document.getElementById('tweet').value.trim();
    // Crear botón de eliminar tarea
    const botonBorrar = document.createElement('a');
    // Añadir al botón una clase que se llama 'borrar-tarea'
    botonBorrar.classList = 'borrar-tarea';
    // Y añadirle al dicho elemento de enlace el valor de 'X'
    botonBorrar.innerText = 'X';
    // Crear elemento y añadirle el contenido a una lista
    const li = document.createElement('li');
    // Añadir al elemento de la lista el valor del campo tarea
    li.innerText = tarea;
    // Una vez añadido el texto se añade también al elemento de la lista el botón
    li.appendChild(botonBorrar);
    // Añadir al div con id 'lista-tweets' el elemento de la lista para que se muestre por pantalla
    listaTareas.appendChild(li);
    // Agregar los datos al LocalStorage, se llama a la función agregarTareaLocalStorage que
    // recibe como parámetro la tarea, que es el valor del campo con la clase tweet
    agregarTareaLocalStorage(tarea);
    // Limpiar caja de texto
    limpiarTarea();
}

// Función de borrar tareas
function borrarTarea(e) {
    // Cancelo cualquier elemento si es cancelable
    e.preventDefault();
    // Compruebo si el elemento sobre el que estoy haciendo click es de la clase 'borrar-tarea'
    if (e.target.className === 'borrar-tarea') {
        // Si lo es tomamos el elemento anterior, que es <li></li> y lo eliminio
        e.target.parentElement.remove();
        // Eliminar la tarea del LocalStorage
        borrarTareaLocalStorage(e.target.parentElement.innerText);
    }    
}

// Agregar tarea al LocalStorage
function agregarTareaLocalStorage(tarea) {
    // En esta función lo que hacemos es añadir las tareas al local storage
    // Creo una variable para guardar las tareas, estas tareas lo primero que hará será
    // traer lo que haya previamente en el local storage
    let tareas;
    tareas = obtenerTareasLocalStorage();
    // Agregar la nueva tarea con la función push que añade en la última posición del arreglo la nueva tarea
    tareas.push(tarea);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tareas))
}

// Se obtienen las tareas que haya guardas previamente en el local storage, retorna un arreglo
function obtenerTareasLocalStorage() {
    let tareas;
    // Revisamos los valores del LocalStorage
    if (localStorage.getItem('tweets') === null) {
        // Si no hay registros se crea un arreglo vacío
        tareas = [];
    } else {
        // Si hay registros se crea un arreglo en base a los datos en formato JSON
        tareas = JSON.parse(localStorage.getItem('tweets'));
    }
    return tareas;
}

// Mostrar datos de LocalStorage en la lista de tareas
function localStorageListo() {
    let tareas;

    // Se guarda en el arreglo el contenido del LocalStorage
    tareas = obtenerTareasLocalStorage();

    // Se recorre con un foreach el arreglo y se van agregando las tareas
    tareas.forEach(function(tarea) {
        // crear botón de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tarea';
        botonBorrar.innerText = 'X'

        // Crear elemento y añadirlo al contenido de la lista
        const li = document.createElement('li');
        li.innerText = tarea;
        // Agrega el botón de borrar a la tarea
        li.appendChild(botonBorrar);
        // Agrega la tarea a la lista
        listaTareas.appendChild(li);
    });
}

// Eliminar tarea del LocalStorage
function borrarTareaLocalStorage(tarea) {
    // Crear variables que contendrá el texto que se buscará eliminar del LocalStorage y del arreglo actual del LocalStorage
    let tareas;
    let tareaBorrar;
    
    // Elimina la X de la tarea
    tareaBorrar = tarea.substring(0, tarea.length - 1);

    // Se trae el contenido del LocalStorage
    tareas = obtenerTareasLocalStorage();

    // Con un foreach se busca si el texto a buscar coincide con alguno del arreglo
    // Para poder eliminarlo se agrega index para conocer su posición
    // Si se encuentra se elimina del arreglo con splice, la posición y la cantidad a eliminar
    tareas.forEach(function(tarea, index){
        if (tareaBorrar === tarea) {
            tareas.splice(index, 1);
        }
    });
    
    // Luego se sustituye el contenido actual del LocalStorage
    localStorage.setItem('tweets', JSON.stringify(tareas));
}

// Limpar texto del textarea cuando se agrega una tarea nueva
function limpiarTarea() {
    let tarea = document.getElementById('tweet');
    tarea.value = '';
}