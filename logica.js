// --- DATOS INICIALES ---
const menu = [
    { id: 1, nombre: "Empanada Operada", precio: 1.5 },
    { id: 2, nombre: "Café Guayoyo", precio: 1.0 },
    { id: 3, nombre: "Jugo de Mora", precio: 2.0 }
];

let carrito = [];
let ventasTotales = []; // Aquí se guardan los pedidos para el cajero

// --- FUNCIONES DE CLIENTE ---
function mostrarCatalogo() {
    const divProd = document.getElementById("contenedor-productos");
    divProd.innerHTML = "";
    menu.forEach(p => {
        divProd.innerHTML += `
            <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                <strong>${p.nombre}</strong> - $${p.precio} <br>
                <button onclick="agregarAlCarrito(${p.id})">Añadir a Carrito</button>
            </div>`;
    });
}

function agregarAlCarrito(id) {
    const prod = menu.find(p => p.id === id);
    carrito.push(prod);
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    document.getElementById("cuenta-carrito").innerText = carrito.length;
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(p => {
        lista.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
        total += p.precio;
    });
    document.getElementById("monto-total").innerText = total.toFixed(2);
}

function finalizarPedido() {
    if (carrito.length === 0) return alert("Carrito vacío");

    // Guardamos la venta en la lista global
    const venta = {
        id: ventasTotales.length + 1,
        total: document.getElementById("monto-total").innerText
    };
    ventasTotales.push(venta);

    // Limpiamos todo
    carrito = [];
    actualizarVistaCarrito();
    alert("✅ Pedido enviado al cajero");
}

// --- FUNCIONES DE CAJERO ---
function mostrarVentasEnPanel() {
    const listaVentas = document.getElementById("lista-ventas-procesadas");
    if (ventasTotales.length === 0) {
        listaVentas.innerHTML = "<li>No hay ventas hoy.</li>";
        return;
    }
    listaVentas.innerHTML = "";
    ventasTotales.forEach(v => {
        listaVentas.innerHTML += `<li><strong>Venta #${v.id}</strong> - Monto: $${v.total}</li>`;
    });
}

// --- LOGIN Y NAVEGACIÓN ---
document.getElementById("btn-entrar").addEventListener("click", () => {
    const u = document.getElementById("usuario").value;
    const c = document.getElementById("clave").value;

    if (u === "ClienteUCV" && c === "Central_123") {
        document.getElementById("seccion-login").style.display = "none";
        document.getElementById("seccion-catalogo").style.display = "block";
        mostrarCatalogo();
    } 
    else if (u === "CajeroUCV" && c === "Caja_2025") {
        document.getElementById("seccion-login").style.display = "none";
        document.getElementById("seccion-cajero").style.display = "block";
        mostrarVentasEnPanel(); // <--- ¡Esto es lo que te faltaba!
    } 
    else {
        document.getElementById("mensaje-error").innerText = "Datos incorrectos";
    }
});

function cerrarSesion() {
    document.getElementById("seccion-catalogo").style.display = "none";
    document.getElementById("seccion-cajero").style.display = "none";
    document.getElementById("seccion-login").style.display = "block";
    document.getElementById("usuario").value = "";
    document.getElementById("clave").value = "";
}