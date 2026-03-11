// 1. "Atrapamos" los elementos del HTML usando su ID
const btnEntrar = document.getElementById("btn-entrar");
const campoUsuario = document.getElementById("usuario");
const campoClave = document.getElementById("clave");
const mensaje = document.getElementById("mensaje-error");

// 2. Escuchamos el evento de "clic" en el botón
btnEntrar.addEventListener("click", function() {
    
    // 3. Guardamos lo que el usuario escribió en ese momento
    const nombreUsuario = campoUsuario.value;
    const contrasena = campoClave.value;

    // 4. Comprobamos si los datos coinciden con el perfil de Clientela
    if (nombreUsuario === "ClienteUCV" && contrasena === "Central_123") {
        alert("¡Ingreso exitoso! Bienvenido al Cafetín.");
        // Aquí es donde más adelante activaremos el catálogo
    } else {
        // Si los datos no coinciden, mostramos el error
        mensaje.innerText = "Error: Usuario o clave incorrectos.";
    }
});