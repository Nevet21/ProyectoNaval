document.addEventListener("DOMContentLoaded", () => {
    fetch("http://127.0.0.1:5000/countries") 
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("countrySelect");
            select.innerHTML = "";

            data.forEach(country => {
               
                let code = Object.keys(country)[0]; 
                let name = country[code];

                let option = document.createElement("option");
                option.value = code;
                option.textContent = name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar los países:", error));
});