
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');


mostrarProductos(stockProductos)

function mostrarProductos(array){
   
    array.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += `<div class="card" class="img-thumbnail">
                            <div class="card-image">
                                <img src=${producto.img}>
                                <span class="card-title">${producto.nombre}</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light red" id=boton${producto.id}><i class="material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.tipo}</p>
                                <p> $${producto.precio}</p>
                            </div>`
        contenedorProductos.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click',()=>{
            agregarAlCarrito(producto.id)
        })

    });
}


function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(productoR => productoR.id == id);
    if(repetido){
        repetido.cantidad =  repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`
        actualizarCarrito()
    }else{
      let productoAgregar = stockProductos.find(prod => prod.id == id);
    console.log(productoAgregar)
    carritoDeCompras.push(productoAgregar);
    
        productoAgregar.cantidad = 1;
    let div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML= `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id=cantidad${productoAgregar.id}>Cantidad: ${productoAgregar.cantidad}</p>
                    <button id=eliminar${productoAgregar.id} class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`

    contenedorCarrito.appendChild(div)  
    actualizarCarrito()
    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    botonEliminar.addEventListener('click', ()=>{
        botonEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(el => el.id != productoAgregar.id);
        actualizarCarrito();
    })  
    }
    
    
    
    
}

function actualizarCarrito() {
   contadorCarrito.innerText = carritoDeCompras.reduce((acc , el)=> acc + el.cantidad,0);
   precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad) , 0)
}

