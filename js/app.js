/**Variables */
//querySelector porque sólo tengo un carrito 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    /**1. Agrego un curso, se genera la función de agregarCurso */
    listaCursos.addEventListener('click', agregarCurso);
}


/**Funciones */
function agregarCurso(e) {
    //evitar la acción por default la cual es del href = #
    e.preventDefault();

    /**2. Nos aseguramos que el usuario haya agregado en agregar carrito */
    if (e.target.classList.contains('agregar-carrito')) {
        /**3. Accedemos a todo el div que tiene el contenido del curso */
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la información del curso
/**4. Leemos los datos  y creamos un objeto con a información que requerimos*/
function leerDatosCurso(curso) {
    //console.log(curso);

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    //.some te permite iterar sobre un arreglo de objetos y verificar si un elemento existe en él
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos]
    } else {
        //Agrega elementos al arreglo de carrito
            /**5. Lo agregamos a nuestro carrito de compras */
        articulosCarrito = [...articulosCarrito, infoCurso]
    }


    console.log(articulosCarrito);

    /**6. Imprimimos ese HTML */
    carritoHTML();
}


//Muestra el carrtio de compras en el HTML
function carritoHTML() {

    //Limpiar el HTML
    LimpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        //Destructuring 
        //<td><img src="${curso.imagen}" width="100"/></td>
        const { imagen, titulo, precio , cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"/></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

       `;

        //Agrega el HTML del carrito en el tbody
        //appendChild lo agrega al final
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody
function LimpiarHTML() {

    /* Forma Lenta para limpiar HTML
    contenedorCarrito.innerHTML = '';
    */

    //Se ejecuta mientras la condición sea evaluada como verdadera
    //Va vaciando uno por uno
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}