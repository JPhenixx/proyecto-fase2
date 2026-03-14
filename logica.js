// --- DATOS ---
let menu = JSON.parse(localStorage.getItem('menuCafetin')) || [
    { id: 1, nombre: "Empanada de Mechada", precio: 1.50 },
    { id: 2, nombre: "Café con Leche", precio: 1.00 },
    { id: 3, nombre: "Pepsi 1L", precio: 2.00 }
];

let ventasTotales = JSON.parse(localStorage.getItem('ventasCafetin')) || [];
let puntosUsuario = 150; // Valor estático según el proyecto
let carrito = [];

function guardarDatos() {
    localStorage.setItem('menuCafetin', JSON.stringify(menu));
    localStorage.setItem('ventasCafetin', JSON.stringify(ventasTotales));
}

// --- LOGIN ---
document.getElementById("btn-entrar").addEventListener("click", () => {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("clave").value;

    if (user === "ClienteUCV" && pass === "Central_123") {
        abrirModulo("seccion-cliente", "cat-cliente");
        document.getElementById("puntos-cliente").innerText = puntosUsuario;
    } else if (user === "CajeroUCV" && pass === "Central_123") {
        abrirModulo("seccion-cajero", "cat-cajero");
        actualizarHistorialCajero();
    } else if (user === "AdminUCV" && pass === "Central_123") {
        abrirModulo("seccion-admin");
        actualizarInventarioAdmin();
    } else {
        document.getElementById("mensaje-error").innerText = "Error: Credenciales inválidas";
    }
});

function abrirModulo(id, catId) {
    document.getElementById("seccion-login").style.display = "none";
    document.getElementById(id).style.display = "block";
    if (catId) renderizarMenu(catId);
}

function renderizarMenu(contenedorId) {
    const div = document.getElementById(contenedorId);
    div.innerHTML = "";
    menu.forEach(p => {
        div.innerHTML += `
            <div class="producto-card">
                <span>${p.nombre} ($${p.precio.toFixed(2)})</span>
                <button onclick="alCarrito(${p.id}, '${contenedorId}')">Añadir</button>
            </div>`;
    });
}

function alCarrito(id, contenedorId) {
    const prod = menu.find(x => x.id === id);
    carrito.push(prod);
    const tipo = contenedorId.includes("cliente") ? "cliente" : "caja";
    actualizarVistaCarrito(tipo);
}

function actualizarVistaCarrito(tipo) {
    const lista = document.getElementById(tipo === "cliente" ? "lista-carrito" : "lista-caja");
    const totalSpan = document.getElementById(tipo === "cliente" ? "total-carrito" : "total-caja");
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach(item => {
        lista.innerHTML += `<li>${item.nombre} - $${item.precio.toFixed(2)}</li>`;
        total += item.precio;
    });
    totalSpan.innerText = total.toFixed(2);
}

function procesarCompra(quien) {
    if (carrito.length === 0) return alert("El carrito está vacío");
    const metodo = document.getElementById(quien === "cliente" ? "pago-cliente" : "pago-cajero").value;
    const total = document.getElementById(quien === "cliente" ? "total-carrito" : "total-caja").innerText;

    ventasTotales.push({
        id: ventasTotales.length + 1,
        monto: total,
        metodo: metodo,
        tipo: quien === "cliente" ? "Cliente" : "Caja",
        fecha: new Date().toLocaleTimeString()
    });

    guardarDatos();
    alert(`✅ ¡Pedido Procesado!\nTotal: $${total}`);
    carrito = [];
    location.reload(); 
}

function actualizarHistorialCajero() {
    const lista = document.getElementById("lista-ventas-totales");
    lista.innerHTML = "";
    if (ventasTotales.length === 0) {
        lista.innerHTML = "<li>No hay ventas hoy.</li>";
        return;
    }
    ventasTotales.forEach(v => {
        lista.innerHTML += `<li>#${v.id} - $${v.monto} [${v.metodo}] (${v.tipo})</li>`;
    });
}

function agregarProductoAdmin() {
    const nom = document.getElementById("adm-nombre").value;
    const pre = parseFloat(document.getElementById("adm-precio").value);
    if (nom && pre) {
        menu.push({ id: Date.now(), nombre: nom, precio: pre });
        guardarDatos();
        actualizarInventarioAdmin();
        alert("Producto añadido.");
        document.getElementById("adm-nombre").value = "";
        document.getElementById("adm-precio").value = "";
    }
}

function eliminarProducto(id) {
    menu = menu.filter(p => p.id !== id);
    guardarDatos();
    actualizarInventarioAdmin();
}

function actualizarInventarioAdmin() {
    const lista = document.getElementById("lista-inventario-admin");
    lista.innerHTML = "";
    menu.forEach(p => {
        lista.innerHTML += `<li>${p.nombre} ($${p.precio.toFixed(2)}) <button onclick="eliminarProducto(${p.id})" class="btn-eliminar">X</button></li>`;
    });
}

function cerrarSesion() { location.reload(); }