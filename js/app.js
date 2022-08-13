/**Variables */
//querySelector porque sólo tengo un carrito 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)
}


/**Funciones */
function agregarCurso(e) {
    //evitar la acción por default la cual es del href = #
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        console.log(e.target);
    }
   
}