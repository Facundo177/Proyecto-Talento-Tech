document.addEventListener("DOMContentLoaded", ()=>{
    const contenedorCarrito = document.getElementById("tabla-carrito");
    const productosEnCarrito = document.querySelector(".productos-en-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    
    function renderizarCarrito(){
        let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];
        let total = 0.0;

        if (carrito.length === 0){
            contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
            totalCarrito.innerHTML = `<h3>Total: $0.00</h3>`;
            return;
        } else {
            const productosHtml = carrito.map(producto => {
                total += parseFloat(producto.precio) * producto.cantidad;
                return `
                    <tr id="producto-en-carrito-${producto.id}">
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>
                            <button id="carrito-sacar-producto-${producto.id}" type="button" class="carrito-sacar-producto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#da3316" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm88 200l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/></svg>
                                </button>
                            <button id="carrito-agregar-producto-${producto.id}" type="button" class="carrito-agregar-producto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#1cc106" d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
                                </button>
                        </td>
                                                
                    </tr>
                `;
            });

            productosEnCarrito.innerHTML = `
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>` + productosHtml.join("");

            totalCarrito.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;

            carrito.forEach(item => {
                const botonSacarProducto = document.getElementById(`carrito-sacar-producto-${item.id}`);
                const botonAgregarProducto = document.getElementById(`carrito-agregar-producto-${item.id}`);
                if (botonSacarProducto) {
                    botonSacarProducto.addEventListener("click", () => {
                        sacarProductoDelCarrito(item.id);
                    });
                }
                if (botonAgregarProducto) {
                    botonAgregarProducto.addEventListener("click", () => {
                        agregarProductoAlCarrito(item.id);
                    });
                }
            });

        }
    }



    function sacarProductoDelCarrito(idProducto) {
        let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];

        const carritoActualizado = carrito.map(item => {
            if (item.id === idProducto) {
                return {
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad - 1
                };
            }
            return item;
        }).filter(item => item.cantidad > 0);

        localStorage.setItem("carritoDeCompras", JSON.stringify(carritoActualizado));
        renderizarCarrito();

    }

    function agregarProductoAlCarrito(idProducto) {
        let carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];

        const carritoActualizado = carrito.map(item => {
            if (item.id === idProducto) {
                return {
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio,
                    cantidad: item.cantidad + 1
                };
            }
            return item;
        });

        localStorage.setItem("carritoDeCompras", JSON.stringify(carritoActualizado));
        renderizarCarrito();

    }























    renderizarCarrito();

});