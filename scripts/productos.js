document.addEventListener("DOMContentLoaded", obtenerYMostrarProductos);


async function obtenerYMostrarProductos() {
    try {
        const response1 = await fetch('https://dummyjson.com/products/category/smartphones');
        const data1 = await response1.json();
        const response2 = await fetch('https://dummyjson.com/products/category/laptops');
        const data2 = await response2.json();
        const response3 = await fetch('https://dummyjson.com/products/category/tablets');
        const data3 = await response3.json();

        let contenedorListaProductos = document.getElementById("celulares");
        let productos = data1.products;
        renderizarProductos();

        contenedorListaProductos = document.getElementById("notebooks");
        productos = data2.products;
        renderizarProductos();

        contenedorListaProductos = document.getElementById("tablets");
        productos = data3.products;
        renderizarProductos();

        actualizarNumeroCarrito();

        function renderizarProductos() {
            const productosHtml = productos.map(producto => {
                return `
                <div class="product-card" data-aos="zoom-in-up">
                <img src="${producto.images[0]}" alt="${producto.title}">
                <h3>${producto.title}</h3>
                <p>${producto.description}</p>
                <p class="precio">Precio: $${producto.price}</p>
                <button type="button" class="product-btn-agregar" id="product-btn-agregar-${producto.id}">
                Agregar al carrito
                </button>
                </div>
                `;
            });

            contenedorListaProductos.innerHTML = productosHtml.join("");

            adjuntarEventosAgregarCarrito();
        }

        function adjuntarEventosAgregarCarrito() {
            productos.forEach(producto => {
                const boton = document.getElementById(`product-btn-agregar-${producto.id}`);
                if (boton) {
                    boton.addEventListener("click", () => {
                        agregarProductoAlCarrito(producto);
                    });
                }
            });
        }

        function agregarProductoAlCarrito(producto) {
            let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
            const indiceProductoExistente = carrito.findIndex(item => item.id === producto.id);
            if (indiceProductoExistente !== -1) {
                carrito[indiceProductoExistente].cantidad++;
            } else {
                carrito.push({
                    id: producto.id,
                    nombre: producto.title,
                    precio: producto.price,
                    cantidad: 1
                });
            }

            localStorage.setItem("carritoDeCompras", JSON.stringify(carrito));

            actualizarNumeroCarrito();

        }
        

    } catch (error) {
        console.error("Error al obtener productos: ", error);
    }

}



function actualizarNumeroCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
    let cantProductos = 0;
    carrito.forEach(producto => cantProductos += producto.cantidad);

    const numeroCarrito = document.querySelector(".nav-shopping-cart-number");

    if (cantProductos > 0) {
        numeroCarrito.style.display = "inline";
        numeroCarrito.innerHTML = `${cantProductos}`;
    } else {
        numeroCarrito.style.display = "none";
    }
}