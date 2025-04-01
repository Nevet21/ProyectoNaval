class barco {
    constructor(nombre,tamaño){
        this.nombre=nombre
        this.tamaño=tamaño

    }

}

const destructor = new barco("destructor",2)
const crucero = new barco("crucero",3)
const submarino = new barco("submarino",3)
const acorazado = new barco("acorazado",4)
const portaAviones = new barco("portaAviones",5)

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