let ventasTotales = [];
// 1. Datos iniciales y variables globales
const menu = [
    { id: 101, nombre: "Empanada Operada", precio: 1.5 },
    { id: 102, nombre: "Café Guayoyo", precio: 1.0 },
    { id: 103, nombre: "Jugo de Mora", precio: 2.0 }
];

let carrito = [];
let historialVentas = []; // Aquí el Cajero verá lo que se venda

// 2. Funciones del Módulo de Clientela
function entrarAlCatalogo() {
    document.getElementById("seccion-login").style.display = "none";
    document.getElementById("seccion-catalogo").style.display = "block";
    
    const divProductos = document.getElementById("contenedor-productos");
    divProductos.innerHTML = ""; // Limpia para no duplicar
    menu.forEach(prod => {
        divProductos.innerHTML += `
            <div style="border: 1px solid #ccc; margin: 10px; padding: 10px; border-radius: 5px;">
                <strong>${prod.nombre}</strong> - $${prod.precio} <br>
                <button onclick="sumarAlCarrito(${prod.id})">Añadir a Carrito</button>
            </div>`;
    });
}

function sumarAlCarrito(idProducto) {
    const item = menu.find(p => p.id === idProducto);
    carrito.push(item);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    document.getElementById("cuenta-carrito").innerText = carrito.length;
    const listaUI = document.getElementById("lista-carrito");
    listaUI.innerHTML = "";
    let subtotal = 0;
    
    carrito.forEach(p => {
        listaUI.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
        subtotal += p.precio;
    });
    document.getElementById("monto-total").innerText = subtotal.toFixed(2);
}

// Nueva función para "Finalizar Compra"
function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    const total = carrito.reduce((sum, p) => sum + p.precio, 0);
    historialVentas.push({
        items: carrito.length,
        monto: total.toFixed(2),
        fecha: new Date().toLocaleTimeString()
    });
    alert("¡Pedido enviado al sistema!");
    carrito = [];
    actualizarInterfazCarrito();
}

// 3. Funciones del Módulo de Cajero
function mostrarPanelCajero() {
    document.getElementById("seccion-login").style.display = "none";
    document.getElementById("seccion-cajero").style.display = "block";
    
    const listaV = document.getElementById("lista-ventas");
    listaV.innerHTML = ""; 

    if (historialVentas.length === 0) {
        listaV.innerHTML = "<li>No hay ventas hoy.</li>";
    } else {
        historialVentas.forEach((venta, index) => {
            listaV.innerHTML += `<li>Venta #${index + 1}: $${venta.monto} (${venta.items} productos) a las ${venta.fecha}</li>`;
        });
    }
}

function cerrarSesion() {
    location.reload(); 
}

// 4. Lógica del Botón de Login (El motor principal)
document.getElementById("btn-entrar").addEventListener("click", function() {
    const userIn = document.getElementById("usuario").value;
    const passIn = document.getElementById("clave").value;

    if (userIn === "ClienteUCV" && passIn === "Central_123") {
        entrarAlCatalogo();
    } 
    else if (userIn === "CajeroUCV" && passIn === "Caja_2025") {
        mostrarPanelCajero();
    } 
    else {
        document.getElementById("mensaje-error").innerText = "Usuario o clave incorrectos";
    }
});function cancelarPedido() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    if (confirm("¿Seguro que quieres borrar todo el carrito?")) {
        carrito = [];
        actualizarInterfazCarrito();
        alert("Pedido cancelado.");
    }
}