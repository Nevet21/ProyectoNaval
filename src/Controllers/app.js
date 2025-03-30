const contenedorBarco= document.querySelector('.opcionBarco')
const botonGirar = document.querySelector('#girar-button')

function girar(){
const Barcos=Array.from(opcionBarco.children)
    Barcos.forEach(barco => barco.style.transform = rotate(90deg))
}

girar()
botonGirar.addEventListener('click', girar)