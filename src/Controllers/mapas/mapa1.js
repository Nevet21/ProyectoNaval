document.addEventListener("DOMContentLoaded", function () {
    // Configuración del tablero
    let filasInput = document.getElementById("filas");
    let columnasInput = document.getElementById("columnas");
    let tabla = document.getElementById("mapa");
    let BtnAceptar = document.getElementById("BtnAceptar");

    function crearMapa() {
        let filas = parseInt(filasInput.value);  // Obtener el número de filas
        let columnas = parseInt(columnasInput.value);  // Obtener el número de columnas

        // Limpiar la tabla antes de crear un nuevo mapa
        tabla.innerHTML = '';

        // Generar las filas y columnas usando ciclos
        for (let i = 0; i < filas; i++) {
            let fila = document.createElement("tr"); // Crear una fila (<tr>)

            for (let j = 0; j < columnas; j++) {
                let celda = document.createElement("td"); // Crear una celda (<td>)
                celda.classList.add("empty"); // Agregar la clase "empty" para agua

                // Colocar barcos aleatorios
                if (Math.random() > 0.8) { // Aproximadamente el 20% de las celdas tendrán barcos
                    celda.classList.add("ocupada"); // Asignar clase "ocupada" para representar un barco
                }

                fila.appendChild(celda); // Agregar la celda a la fila
            }

            tabla.appendChild(fila); // Agregar la fila al tablero
        }
    }

    // Evento para crear el mapa cuando se haga clic en el botón
    BtnAceptar.addEventListener("click", crearMapa);
});

