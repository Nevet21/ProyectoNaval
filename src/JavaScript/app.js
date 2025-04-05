document.addEventListener("DOMContentLoaded", function () {
    const contenedorTablero= document.querySelector('#contenedorTableros')
    const contenedorBarco= document.querySelector('.opcionBarco'); //recibe el div que contiene todos los div coon los barocs
    const botonGirar = document.querySelector('#girar-button');
    const starButoon= document.querySelector('#Iniciar-button');
    const info = document.querySelector('#info')
    const turnDysplay=document.querySelector('#turn-display')

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
    
        let tamaño = 10;
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
        
    crearTablero('yellow', 'player')
    crearTablero('pink',   'computer')
    
    // crear barcos
    
    class barco {
        constructor(nombre,tamaño){
            this.nombre=nombre
            this.tamaño=tamaño
    
        }
    
    }
    
    const destructor = new barco("destructor",2)
    const crucero = new barco("submarino",3)
    const submarino = new barco("crucero",3)
    const acorazado = new barco("acorazado",4)
    const portaAviones = new barco("portaAviones",5)
    
    const barcos=[destructor,submarino,crucero,acorazado,portaAviones]
    let notDropped

    function verificarValido(BloquesTablero, startIndex,barco,isHorizontal){
        
        let validStart = isHorizontal ? startIndex <= tamaño*tamaño - barco.tamaño ? startIndex  :
            tamaño*tamaño - barco.tamaño  :  
            //vertica
            startIndex <= tamaño*tamaño - tamaño * barco.tamaño ? startIndex: 
                startIndex -  barco.tamaño *  tamaño  + tamaño

        let bloquesBarco = []

        for(let i=0; i < barco.tamaño; i++ ){
            if (isHorizontal) {
                bloquesBarco.push((BloquesTablero[Number(validStart)+i]))
            }
            else{
                bloquesBarco.push(BloquesTablero[Number(validStart)+i*tamaño])

            }
        }

        let valid

        if ( isHorizontal){
        bloquesBarco.every((_bloqueBarco, index)=>
            valid= bloquesBarco[0].id % tamaño !== tamaño - (bloquesBarco.length - (index+1)))
        }else{
            bloquesBarco.every((_bloqueBarco,index)=>
                valid=bloquesBarco[0].id < 90 + (tamaño* index+1))

        }

        const notTaken =bloquesBarco.every(bloqueBarco => !bloqueBarco.classList.contains('taken'))

        return {bloquesBarco, valid, notTaken}
    }

    function añadirBarco(user,barco, startId){
        const BloquesTablero= document.querySelectorAll(`#${user} div`)
        let randomBoolean = Math.random() < 0.5
        let isHorizontal = user=== 'player' ? angle===0 : randomBoolean
        let randomStartIndex = Math.floor(Math.random()*tamaño*tamaño)
        
        let startIndex = startId ? startId : randomStartIndex

        const {bloquesBarco, valid, notTaken} = verificarValido(BloquesTablero, startIndex,barco,isHorizontal)

        if (valid && notTaken){
            bloquesBarco.forEach(bloqueBarco =>{
                bloqueBarco.classList.add(barco.nombre)
                bloqueBarco.classList.add('taken')
            })
        } else{
            if (user === 'computer') añadirBarco(user,barco,startId)
            if (user=== 'player') notDropped = true
        }
        
            
    }

    barcos.forEach(barco=> añadirBarco('computer',barco,null))

    //barcos arrastrables
    let barcoMovido
    const opcionBarco = Array.from(contenedorBarco.children)
    opcionBarco.forEach(opcion => opcion.addEventListener('dragstart', dragStart))

    const bloquesJugador= document.querySelectorAll('#player div')
        bloquesJugador.forEach(bloque => {
            bloque.addEventListener('dragover', dragOver)
            bloque.addEventListener('drop', dropShip)
        })

        function dragStart(e) {
            notDropped = false;
            barcoMovido = e.target;
            console.log(barcoMovido);
        }
        

    function dragOver(e){
        e.preventDefault()
        const barco =barcos[barcoMovido.id]
        highlightArea(e.target.id, barco)
    }

    function dropShip(e){
        const startId=e.target.id
        const barco = barcos.find(b => b.nombre === barcoMovido.dataset.nombre);
        añadirBarco('player',barco, startId)
        if(!notDropped){
            barcoMovido.remove()
        }
    }

function highlightArea(startIndex, barco){
    const bloques=document.querySelectorAll('#player div')
    let isHorizontal = angle ===0

    const {bloquesBarco,valid,notTaken}=verificarValido(bloques, isHorizontal,startIndex,barco )
    if(valid && notTaken){
        bloquesBarco.forEach(bloqueBarco=>{
            bloques.classList.add('hover')
            setTimeout(()=> bloqueBarco.classList.remove('hover'), 500)
        })
    }
    }
let gameOver=false
let playerTuurn

//start Game

function startGame(){
if (playerTuurn === undefined) {
    if (contenedorBarco.children.length !=0){
        info.textContent ='Acomode los barcos como guste'

    } else{
        const BloquesTablero =document.querySelectorAll('#computer div')
        BloquesTablero.forEach(bloque=> bloque.addEventListener('click', handleClick))
        playerTuurn=true
        turnDysplay.textContent= 'Tu turno'
        info.textContent='Empieza la batalla!!!'
    }

}
}
starButoon.addEventListener('click',startGame)

let computerHits=[]
let playerHits=[]
const playerSunkShips=[]
const computerunkShips=[]

function handleClick(e){
    if (!gameOver) {
        if(e.target.classList.contains('taken')){
            e.target.classList.add('boom')
            info.textContent = 'has  impactado la computadora!!'
            let classes=Array.from(e.target.classList)
            classes=classes.filter(className => className !== 'bloque')
            classes=classes.filter(className => className !== 'boom')
            classes=classes.filter(className => className !== 'taken')
            playerHits.push(...classes)
            console.log(playerHits)
            checkScore('player', playerHits, playerSunkShips)

        }
        if (!e.target.classList.contains('taken')) {
            info.textContent= 'No hubo impacto!!'
            e.target.classList.add('empty')
        }

        playerTuurn=false
        const bloquesTablero= document.querySelectorAll('#computer div')
        bloquesTablero.forEach(bloque=>bloque.replaceWith(bloque.cloneNode(true)))
        setTimeout(computerGo, 3000)
    }

}

//turno computadora
function computerGo(){
    if (!gameOver){
        turnDysplay.textContent='Turno maquina'
        turnDysplay.textContent = 'Esperando a la maquina'

        setTimeout(()=>{
            let randomGoo=Math.floor(Math.random()*tamaño*tamaño)
            const bloquesTablero=document.querySelectorAll('#player div')
            if (bloquesTablero[randomGoo].classList.contains('taken') &&
            bloquesTablero[randomGoo].classList.contains('taken') )
        {
            computerGo()
            return    
            } else if(
                bloquesTablero[randomGoo].classList.contains('taken') &&
                !bloquesTablero[randomGoo].classList.contains('boom'))
            {
                bloquesTablero[randomGoo].classList.add('boom')
                info.textContent = 'Has sido impactado por la computadora'
                let classes=Array.from(bloquesTablero[randomGoo].classList)
                classes=classes.filter(className => className !== 'bloque')
                classes=classes.filter(className => className !== 'boom')
                classes=classes.filter(className => className !== 'taken')
                computerHits.push(...classes)
                checkScore('computer',computerHits,computerunkShips)
            }else {
                info.textContent='no hubo impacto'
                bloquesTablero[randomGoo].classList.add('empty')

            }
        },  3000)
        setTimeout(()=>{
            playerTuurn= true
            turnDysplay.textContent = ' tu turno'
            info.textContent= 'please teake your go'
            const bloquesBarco = document.querySelectorAll('#computer div')
            bloquesBarco.forEach(bloque=> bloque.addEventListener('click', handleClick))
        },  6000)
    }
}

function checkScore(user,userHits,userSunkShips){
    function checkShip(shipName,  shipLenght){
        if (userHits.filter(storedShipName => storedShipName === shipName).length === shipLenght) {
            info.textContent= `you sunk the ${user}s ${shipName}`
            if(user=== 'player'){
                playerHits=userHits.filter(storedShipName=> storedShipName !== shipName)
            }
            if(user=== 'computer'){
                computerHits= userHits.filter(storedShipName=> storedShipName !== shipName)
            }
            userSunkShips.push(shipName)
        }
    }

    checkShip('destructor',2)
    checkShip('submarino',3)
    checkShip('crucero',3)
    checkShip('acorazado',4)
    checkShip('portaAviones',5)

    console.log('playeraHits',playerHits )
    console.log('playerSunkSHIPS',playerSunkShips )



    if(playerSunkShips.length===5){
        info.textContent = 'Has ganado!!!'
        gameOver=true
    }
    if(computerunkShips.length===5){
        info.textContent = 'La computadora te ha ganado, PERDISTE!!!'
        gameOver=true
    }



    
}

 //fin   
})  