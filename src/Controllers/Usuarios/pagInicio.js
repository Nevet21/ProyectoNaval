document.addEventListener("DOMContentLoaded", function (){
    let BtnIngresar=  this.documentElement.getElementById("Ingresar")
    let BtnRegistrar=  this.documentElement.getElementById("Registrar")

    function CompararUsuarios(nombre) {
        fetch("https://jsonplaceholder.typicode.com/users") // Suponiendo que esta es la API
            .then(response => response.json())
            .then(data => {
                let usuarioExistente = false; // Variable para controlar si el usuario ya existe
                
                // Comparamos cada usuario de la API con el nombre ingresado
                data.forEach(usuario => {
                    if (usuario.name === nombre) {
                        usuarioExistente = true; // El nombre existe en la API
                    }
                });

            })
            .catch(error => console.error("Error al obtener usuarios:", error));

        return usuarioExistente
    }
    

    function crearUsuario() {
        let nombre = document.getElementById("nombre").value.trim();
        let pais = document.getElementById("pais").value.trim();

        

        if (nombre === "" || pais === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        existe=CompararUsuarios(nombre)

        if (existe) {
            alert("El nombre ingresado no se encuentra disponible")
            return;
        }

        let usuario = { name: nombre, pais: pais };
        

        fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(() => {
            alert("Usuario creado con éxito.");
        })
        .catch(error => console.error("Error al crear usuario:", error));
    }
    function IngresarUsuario() {
        let nombre = document.getElementById("nombre").value.trim();
        let pais = document.getElementById("pais").value.trim();

        

        if (nombre === "" || pais === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
        existe=CompararUsuarios(nombre)

        if (existe) {
            alert("Usuario ingresado correctamente ")
        }
        else{
            alert("El usuario no existe, ingrese otro nombre")
            return;
        }

        let usuario = { name: nombre, pais: pais };
        

    }
    BtnRegistrar.addEventListener("click", crearUsuario);
    BtnIngresar.addEventListener("click", IngresarUsuario);
})