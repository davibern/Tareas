/*
    Variables
*/
export const listaTareas = document.getElementById('lista-tareas');

/*
    Funciones a exportar
*/

// Función para agregar Tareas
export function agregarTarea(e) {
        /*
            El evento funciona con la siguiente secuencia:
            1 - Se cancela cualquier elemento si es cancelable
            2 - Se lee el valor del campo y se almacena sin espacios por delante o por detrás
            3 - Se crea el botón de eliminar tarea
            4 - Se agrega dicho botón a una clase que se llama 'borrar-tarea'
            5 - A dicho elemento se le agrega el texto 'X'
            6 - Se crea la tarea y se incluye en la lista
            7 - Se agrega al elemento de la lista el valor del campo tarea
            8 - Una vez añadido el texto se agerga también al elemento de la lista botón
            9 - Añadir al div con id 'lista-tareas' el elemento de la lista para que se muestre por pantalla
            10 - Agregar los datos al LocalStorage, que se llama a la función agregarTareaLocalStorage
            11 - Se limpia el valor del campo de texto
        */
        e.preventDefault();
        const tarea = document.getElementById('tarea').value.trim();
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tarea';
        botonBorrar.innerText = 'X';
        const li = document.createElement('li');
        li.innerText = tarea;
        li.appendChild(botonBorrar);
        listaTareas.appendChild(li);
        agregarTareaLocalStorage(tarea);
        limpiarTarea();
}

// Función de borrar tareas
export function borrarTarea(e) {
    /*
        El evento funciona con la siguiente secuencia:
        1 - Se cancela cualquier elemento si es cancelable
        2 - Se comprueba si el elemento sobre el que estoy haciendo click es de la clase 'borrar-tarea'
            Si lo es, tomamos el elemento anterior, que es <li></li> y lo elimino,
            y luego se elimina del LocalStorage
    */

    const audio = document.getElementById("audio");

    e.preventDefault();
    if (e.target.className === 'borrar-tarea') {
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.innerText);
        audio.play();
    }    
}

// Mostrar datos de LocalStorage en la lista de tareas
export function localStorageListo() {
    /*
        El evento funciona con la siguiente secuencia:
        1 - Se guarda en el arreglo el contenido del LocalStorage
        2 - Se recorre con un foreach el arreglo y se van agregando las tareas
        3 - Se crea el botón de eliminar en el foreach
        4 - Se crea el elemento y se añade al contenido de la lista
        5 - Se agrega el botónd e borrar a la tarea
        6 - Se agrega la tarea a la lista
    */
    let tareas;
    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea) {
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tarea';
        botonBorrar.innerText = 'X'
        const li = document.createElement('li');
        li.innerText = tarea;
        li.appendChild(botonBorrar);
        listaTareas.appendChild(li);
    });
}

/*
    Funciones de control que no es neceario exportar
*/

// Agregar tarea al LocalStorage
function agregarTareaLocalStorage(tarea) {
    /*
        El evento funciona con la siguiente secuencia:
        1 - En esta función lo que se hace es añadir las tareas al LocalStorage
        2 - Se crea una variable para guardar las tareas
        3 - Se lee previamente lo que hay en el LocalStorage
        4 - Se agrega la nueva tarea con la función push que añade en la última posición del arreglo la nueva tarea
        5 - Se convierte de string a arreglo para el LocalStorage (LocalStorage sólo almacena texto)
    */
    let tareas;
    tareas = obtenerTareasLocalStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas))
}

// Obtner las tareas que estén almacenadas en LocalStorage
function obtenerTareasLocalStorage() {
    /*
        El evento funcioa con la siguiente secuencia:
        1 - Se revisa los valores del LocalStorage
        2 - Si no hay registros se crea un arreglo vacío
        3 - Si hay registros se crea un arreglo en base a los datos en forma JSON
    */
    let tareas;
    
    if (localStorage.getItem('tareas') === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }
    return tareas;
}

// Eliminar tarea del LocalStorage
function borrarTareaLocalStorage(tarea) {
    /*
        El evento funciona con la siguiente secuencia:
        1 - Se creaa variables que contendrá el texto que se buscará eliminar del LocalStorage y del arreglo actual del LocalStorage
        2 - Se elimina la X del texto de la tarea para buscar la tara a eliminar
        3 - Se trae el contenido del LocalStorage
        4 - Con un foreach se busca si el texto a eliminar coincide con alguno del arreglo
        5 - Para poder eliminarlo se añade index al foreach para poder luego eliminarlo por su posición
        6 - Si se encuentra se elimina de arreglo con splice: la posición y la cantidad a eliminar
        7 - Luego se sustitye el conteido actual del LocalStorage
    */
    let tareas;
    let tareaBorrar;
    
    tareaBorrar = tarea.substring(0, tarea.length - 1);
    tareas = obtenerTareasLocalStorage();
    tareas.forEach(function(tarea, index){
        if (tareaBorrar === tarea) {
            tareas.splice(index, 1);
        }
    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Limpar texto del textarea cuando se agrega una tarea nueva
function limpiarTarea() {
    /*
        El evento funciona con la siguiente secuencia:
        1 - Se crea variable para obtener el objeto 
        2 - Se le cambia el valor a blanco
    */
    let tarea = document.getElementById('tarea');
    tarea.value = '';
}