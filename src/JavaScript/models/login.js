document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerBtn = document.getElementById("register-btn");
    const starButton = document.getElementById("start-btn")
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value.trim();
        const country = document.getElementById("countrySelect").value;

        if (!username || !country) {
            alert("Por favor, ingrese un nombre y seleccione un país.");
            return;
        }

        // Verifica si el usuario ya está registrado porque sino pues cómo inicia
        const storedUser = localStorage.getItem(username);

        if (storedUser) {
           localStorage.setItem("currentUser", username);
            window.location.href = "../html/juego.html";
        } else {
            alert("Usuario no registrado. Por favor, regístrese primero.");
        }
    });

    registerBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const country = document.getElementById("countrySelect").value;

        if (!username || !country) {
            alert("Ingrese un nombre y seleccione un país para registrarse.");
            return;
        }

        // Guardar usuario en localStorage (investigar sobre localStorage Lubier)
        localStorage.setItem(username, JSON.stringify({ username, country }));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
    });
});
