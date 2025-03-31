document.addEventListener("DOMContentLoaded", function () {
const contenedorTablero= document.querySelector('#contenedorTableros')
const contenedorBarco= document.querySelector('.opcionBarco'); //recibe el div que contiene todos los div coon los barocs
const botonGirar = document.querySelector('#girar-button');


let angle=0
function girar(){
const opcionBarcos=(Array.from(contenedorBarco.children)) //se obtienen los barcos y se guarda en un arreglo
    if (angle===0){ //girar los barcos dado el angulo, si es 90 a o si es 0 a 90
        angle=90
    } else{
        angle=0
    }
    opcionBarcos.forEach(opcionBarcos => opcionBarcos.style.transform = `rotate(${angle}deg)`) 
    }

    botonGirar.addEventListener("click", girar)

    let tamaño = 15;
    const tableroSize = 200; // Tamaño fijo del tablero en píxeles
    
    function crearTablero(color, user) {
        const tablero = document.createElement('div');
        tablero.classList.add('tablero');
        tablero.style.backgroundColor = color;
        tablero.id = user;
    
        // Calcular el tamaño de los bloques
        const bloqueSize = `${tableroSize / tamaño}px`;
    
        // Establecer la variable CSS en el tablero
        tablero.style.setProperty('--bloque-size', bloqueSize);
    
        for (let i = 0; i < tamaño * tamaño; i++) {
            const bloque = document.createElement('div');
            bloque.classList.add('bloque');
            bloque.id = i;
            tablero.append(bloque);
        }
    
        contenedorTablero.append(tablero);
    }
    
crearTablero('blue', 'jugador')
crearTablero('red',   'maquina')

// crear barcos

class barco {
    constructor(nombre,tamaño){
        this.nombre=nombre
        this.tamaño=tamaño

    }

}

const destructor = new barco("destructor",2)
const crucero = new barco("destructor",3)
const submarino = new barco("destructor",3)
const acorazado = new barco("destructor",4)
const portaAviones = new barco("destructor",5)

const barcos=[destructor,crucero,submarino,acorazado,portaAviones]

function añadirBarco(barco){
    const bloquesComputadora=document.querySelectorAll('#computer  div')
    let randomBoolean= Math.random() < 0.5 //genera un aleatorio del 50 por ciento de las veces entre horizontal y vertical
    let horizotal=randomBoolean
    let randomIndex=Math.floor(Math.random()* tamaño*tamaño) //genera un random aleatorio en cualquier index del tablero para poner el inicio del barco
    

    let bloquesBarco=[]

    for (let i = 0; i < barco.length; i++) {
        if (horizontal) {
            bloquesBarco.push(bloquesComputadora[Number(randomIndex)+ i]) //usamos un ciclo para agregar los bloques del barco a un arreglo, en este caso me encuentra los numero consecutivos al lado

        } else{
            bloquesBarco.push(bloquesComputadora[Number(randomIndex)+i*tamaño])//aqui encontramos los numeros de los bloques del barco vertical los cuales quedan justo debajo del numero inicial random
        }
        
    }

    bloquesBarco.forEach(bloqueBarco=> {
        bloqueBarco.classList.add(barco.nombre)
        bloqueBarco.classList.add('token')
    })
}   
añadirBarco(destructor)


})