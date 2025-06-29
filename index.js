document.addEventListener("DOMContentLoaded", ()=>{
    const destacados = [
        {
            id: "1", 
            nombre: "Celulares", 
            imagen: "./images/andrey-matveev-PLHT-9b3WTw-unsplash-small.jpg", 
        },
        {
            id: "2", 
            nombre: "Gráficas", 
            imagen: "./images/andrey-matveev-rn39Ab-nSkg-unsplash-small.jpg", 
        },
        {
            id: "3", 
            nombre: "Motherboards", 
            imagen: "./images/andrey-matveev-ipHBTtGumPg-unsplash-small.jpg", 
        },
        {
            id: "4", 
            nombre: "Memorias RAM", 
            imagen: "./images/andrey-matveev-O454z-EMz7k-unsplash-small.jpg", 
        },
        {
            id: "5", 
            nombre: "Procesadores", 
            imagen: "./images/andrey-matveev-rmY0zSYsAUc-unsplash-small.jpg", 
        },
        {
            id: "6", 
            nombre: "Fuentes de alimentación", 
            imagen: "./images/andrey-matveev-jpywGp9McEA-unsplash-small.jpg", 
        },
        {
            id: "7", 
            nombre: "Coolers", 
            imagen: "./images/andrey-matveev-UcMWaJRNM6U-unsplash-small.jpg", 
        },
        {
            id: "8", 
            nombre: "Mouse", 
            imagen: "./images/andrey-matveev-SvLpGADs4gA-unsplash-small.jpg", 
        },
        {
            id: "9", 
            nombre: "Teclados", 
            imagen: "./images/andrey-matveev-uHETeFHexH4-unsplash-small.jpg", 
        },
        {
            id: "10", 
            nombre: "Auriculares", 
            imagen: "./images/andrey-matveev-a6WorCr9CR4-unsplash-small.jpg", 
        },
        {
            id: "11", 
            nombre: "Discos duros", 
            imagen: "./images/andrey-matveev-nfuuFQ41byY-unsplash-small.jpg", 
        },
        {
            id: "12", 
            nombre: "Discos sólidos", 
            imagen: "./images/andrey-matveev-YFAz5YAMQhk-unsplash-small.jpg", 
        }
    ];

    const productsContainer = document.querySelector(".products-container");

    function renderizarDestacados(){
        const productosHtml = destacados.map(producto => {
            return `
                <div class="product-card" data-aos="zoom-in-up">
                    <img src="${producto.imagen}" alt="">
                    <h3>${producto.nombre}</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos tempora accusamus magni deleniti magnam ex excepturi velit dolores aliquam earum?
                    </p>
                    <a href="./productos.html">
                        <button type="button" class="product-btn-agregar">Ver productos</button>
                    </a>
                </div>
            `;
        });

        productsContainer.innerHTML = productosHtml.join("");
    }

    renderizarDestacados();
    actualizarNumeroCarrito();

});



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