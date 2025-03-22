document.addEventListener("DOMContentLoaded", function () {
    // Configuración del tablero
    let filas = this.documentElement.documentElementById("filas");
    let columnas = this.documentElement.documentElementById("columnas")
    let tabla = document.getElementById("mapa");
    let BtnAceptar=document.getElementById("BtnAceptar")
    function crearMapa(){
                // Generar las filas y columnas usando ciclos
                for (let i = 0; i < filas; i++) {
                    let fila = document.createElement("tr"); // Crear una fila (<tr>)
        
                    for (let j = 0; j < columnas; j++) {
                        let celda = document.createElement("td"); // Crear una celda (<td>)
                        celda.classList.add("empty"); // Agregar la clase "empty" para agua
        
                        // Ejemplo: Colocar barcos aleatorios
                        if (Math.random() > 0.8) { // Aproximadamente el 20% de las celdas tendrán barcos
                            celda.classList.add("ocupada"); // Asignar clase "ocupada" para representar un barco
                        }
        
                        fila.appendChild(celda); // Agregar la celda a la fila
                    }
        
                    tabla.appendChild(fila); // Agregar la fila al tablero
                }

    }

    BtnAceptar.addEventListener("click", crearMapa);

    })
