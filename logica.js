// --- DATOS INICIALES ---
const menu = [
    { id: 101, nombre: "Empanada Operada", precio: 1.50 },
    { id: 102, nombre: "Café Guayoyo", precio: 1.00 },
    { id: 103, nombre: "Jugo de Mora", precio: 2.00 }
];

let carrito = [];
let ventasTotales = []; // Aquí se guardan los pedidos para el cajero

// --- FUNCIONES DE LOGIN ---
document.getElementById("btn-entrar").addEventListener("click", function() {
    const u = document.getElementById("usuario").value;
    const c = document.getElementById("clave").value;

    if (u === "ClienteUCV" && c === "Central_123") {
        document.getElementById("seccion-login").style.display = "none";
        document.getElementById("seccion-catalogo").style.display = "block";
        renderizarProductos();
    } else if (u === "CajeroUCV" && c === "Caja_2025") {
        document.getElementById("seccion-login").style.display = "none";
        document.getElementById("seccion-cajero").style.display = "block";
        mostrarVentasEnPanel();
    } else {
        document.getElementById("mensaje-error").innerText = "Usuario o clave incorrectos";
    }
});

// --- LÓGICA DE CLIENTE ---
function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar
    menu.forEach(p => {
        contenedor.innerHTML += `
            <div style="border: 1px solid #ddd; padding: 10px; margin: 5px; border-radius: 8px;">
                <strong>${p.nombre}</strong> - $${p.precio.toFixed(2)} <br>
                <button onclick="agregarAlCarrito(${p.id})">Añadir a Carrito</button>
            </div>`;
    });
}

function agregarAlCarrito(id) {
    const item = menu.find(p => p.id === id);
    carrito.push(item);
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const listaUI = document.getElementById("lista-carrito");
    const cuenta = document.getElementById("cuenta-carrito");
    const totalUI = document.getElementById("monto-total");
    
    listaUI.innerHTML = "";
    let suma = 0;
    
    carrito.forEach(p => {
        listaUI.innerHTML += `<li>${p.nombre} - $${p.precio.toFixed(2)}</li>`;
        suma += p.precio;
    });
    
    cuenta.innerText = carrito.length;
    totalUI.innerText = suma.toFixed(2);
}

document.getElementById("btn-finalizar").addEventListener("click", function() {
    if (carrito.length === 0) return alert("Carrito vacío");

    const nuevaVenta = {
        id: ventasTotales.length + 1,
        monto: document.getElementById("monto-total").innerText
    };

    ventasTotales.push(nuevaVenta); // Se envía al cajero
    carrito = []; // Limpiar carrito
    actualizarCarritoUI();
    alert("¡Pedido enviado con éxito!");
});

// --- LÓGICA DE CAJERO ---
function mostrarVentasEnPanel() {
    const listaVentas = document.getElementById("lista-ventas-procesadas");
    if (ventasTotales.length === 0) {
        listaVentas.innerHTML = "<li>No hay ventas hoy.</li>";
        return;
    }
    listaVentas.innerHTML = "";
    ventasTotales.forEach(v => {
        listaVentas.innerHTML += `<li>Venta #${v.id} - Monto: $${v.monto}</li>`;
    });
}

// --- CIERRE DE SESIÓN ---
function cerrarSesion() {
    document.getElementById("seccion-catalogo").style.display = "none";
    document.getElementById("seccion-cajero").style.display = "none";
    document.getElementById("seccion-login").style.display = "block";
    document.getElementById("usuario").value = "";
    document.getElementById("clave").value = "";
}

document.getElementById("btn-cerrar-cliente").addEventListener("click", cerrarSesion);
document.getElementById("btn-cerrar-cajero").addEventListener("click", cerrarSesion);