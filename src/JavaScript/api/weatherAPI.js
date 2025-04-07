const apiKey = '2927f80039f5d07fcfab4c206461937e';

document.getElementById('buscarClima').addEventListener('click', () => {
  const ciudad = document.getElementById('ciudadInput').value;
  if (!ciudad) return alert("Ingresa una ciudad");

  obtenerClima(ciudad);
});

function obtenerClima(ciudad) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)}&appid=${apiKey}&units=metric&lang=es`;

  fetch(url)
    .then(res => res.json())
    .then(data => mostrarClima(data))
    .catch(err => {
      console.error(err);
      alert("No se pudo obtener el clima");
    });
}

function mostrarClima(data) {
  if (data.cod !== 200) {
    return document.getElementById('datosClima').innerHTML = "Ciudad no encontrada.";
  }

  const html = `
    <h3>Clima en ${data.name}</h3>
    <p>Temperatura: ${data.main.temp} °C</p>
    <p>Clima: ${data.weather[0].description}</p>
    <p>Humedad: ${data.main.humidity}%</p>
    <p>Viento: ${data.wind.speed} m/s</p>
  `;

  document.getElementById('datosClima').innerHTML = html;
}
