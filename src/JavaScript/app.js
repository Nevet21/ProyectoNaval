document.addEventListener("DOMContentLoaded", function () {
    const contenedorTablero= document.querySelector('#contenedorTableros')
    const contenedorBarco= document.querySelector('.opcionBarco'); //recibe el div que contiene todos los div coon los barocs
    const botonGirar = document.querySelector('#girar-button');
    const starButoon= document.querySelector('#Iniciar-button');
    const info = document.querySelector('#info')
    const turnDysplay=document.querySelector('#turn-display')
    const exportar=document.querySelector('#Exportar-mapa')

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

    const {bloquesJugador, valid, notTaken} = verificarValido(bloques, startIndex, barco, isHorizontal)
    if(valid && notTaken){
        bloquesJugador.forEach(bloqueJugador=>{
            bloqueJugador.classList.add('hover')
            setTimeout(()=> bloqueJugador.classList.remove('hover'), 500)
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

function handleClick(e) {
    if (!gameOver && playerTuurn) {
        const target = e.target;

        if (target.classList.contains('boom') || target.classList.contains('empty')) {
            return; // Ya se disparó en esta celda
        }

        if (target.classList.contains('taken')) {
            target.classList.add('boom');
            info.textContent = '¡Has impactado a la computadora!';

            let classes = Array.from(target.classList).filter(
                className => !['bloque', 'boom', 'taken'].includes(className)
            );
            playerHits.push(...classes);
            checkScore('player', playerHits, playerSunkShips);

            // 🔁 MANTENER TURNO
            return;
        } else {
            info.textContent = '¡No hubo impacto!';
            target.classList.add('empty');

            // Cambiar turno solo si fue agua
            playerTuurn = false;

            const bloquesTablero = document.querySelectorAll('#computer div');
            bloquesTablero.forEach(bloque => bloque.replaceWith(bloque.cloneNode(true)));

            // Esperar y dejar que juegue la computadora
            setTimeout(computerGo, 3000);
        }
    }
}


//turno computadora
function computerGo() {
    if (!gameOver) {
        turnDysplay.textContent = 'Turno máquina';
        info.textContent = 'Esperando a la máquina...';

        setTimeout(() => {
            const bloquesTablero = document.querySelectorAll('#player div');
            let randomGoo = Math.floor(Math.random() * tamaño * tamaño);
            let celda = bloquesTablero[randomGoo];

            // Si ya fue seleccionada, intentar de nuevo
            if (celda.classList.contains('boom') || celda.classList.contains('empty')) {
                computerGo(); // reintenta otra posición
                return;
            }

            if (celda.classList.contains('taken')) {
                celda.classList.add('boom');
                info.textContent = '¡Has sido impactado por la computadora!';

                let classes = Array.from(celda.classList).filter(
                    className => !['bloque', 'boom', 'taken'].includes(className)
                );
                computerHits.push(...classes);
                checkScore('computer', computerHits, computerunkShips);

                // 💥 Repetir turno si impactó
                setTimeout(computerGo, 1000);
                return;
            } else {
                celda.classList.add('empty');
                info.textContent = '¡La computadora falló!';
            }

            // 🌀 Dar el turno al jugador después de 3 segundos
            setTimeout(() => {
                playerTuurn = true;
                turnDysplay.textContent = 'Tu turno';
                info.textContent = '¡Arroja tu bomba!';
                
                const bloquesBarco = document.querySelectorAll('#computer div');
                bloquesBarco.forEach(bloque => bloque.addEventListener('click', handleClick));
            }, 3000);

        }, 1500);
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
            console.log(userSunkShips)
        }
    }

    checkShip('destructor',2)
    checkShip('submarino',3)
    checkShip('crucero',3)
    checkShip('acorazado',4)
    checkShip('portaAviones',5)




    if(playerSunkShips.length===5){
        info.textContent = 'Has ganado!!!'
        gameOver=true

        const score1 = score()
        console.log("puntaje: ", score1)
    }
    if(computerunkShips.length===5){
        info.textContent = 'La computadora te ha ganado, PERDISTE!!!'
        gameOver=true

        const score1 = score()
        console.log("puntaje: ", score1)
    }



    
}


function generarMapaJugador(){
    mapa=[]
    let arreglo = [];
    let i = 0;
    
    const bloquesJugador=document.querySelectorAll('#player div')
    bloquesJugador.forEach(bloque=> {
        if (bloque.classList.contains('taken') && (bloque.classList.contains('boom'))) {
            arreglo.push("p1-h")
        }
        else if (bloque.classList.contains('taken')) {
            arreglo.push("p1")
        }else if (bloque.classList.contains('empty')) {
            arreglo.push("b")
        }
        else{
            arreglo.push("a")
        }

        if (arreglo.length===tamaño ) {
            mapa.push(arreglo)
            arreglo=[]
        }
    })

    const contenido = JSON.stringify(mapa, null, 2);
    const blob = new Blob([contenido], { type: "application/json" });

    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "mapa.json";

    enlace.click();
    URL.revokeObjectURL(enlace.href);

    
    
console.log("mapa jugador: ",mapa)
}

function generarMapaComputadora(event) {
    let mapa = [];
    let arreglo = [];
    const bloquesComputadora = document.querySelectorAll('#computer div');

    bloquesComputadora.forEach(bloque => {
        if (bloque.classList.contains('taken') && bloque.classList.contains('boom')) {
            arreglo.push("p2-h");
        } else if (bloque.classList.contains('taken')) {
            arreglo.push("p2");
        } else if (bloque.classList.contains('empty')) {
            arreglo.push("b");
        } else {
            arreglo.push("a");
        }

        if (arreglo.length === tamaño) {
            mapa.push(arreglo);
            arreglo = [];
        }
    });

    console.log("mapa computadora: ", mapa);

    // ✅ Solo descargar si fue llamada por el botón exportar
    if (event?.target?.id === "Exportar-mapa") {
        const contenido = JSON.stringify(mapa, null, 2);
        const blob = new Blob([contenido], { type: "application/json" });

        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "mapa.json";

        enlace.click();
        URL.revokeObjectURL(enlace.href);
    }

    return mapa

    
    
}

exportar.addEventListener('click',generarMapaComputadora)
exportar.addEventListener('click',generarMapaJugador)



function score(){
    let mapa
    mapa=generarMapaComputadora(null)
    let score=0;

    for (let i = 0; i < mapa.length; i++) {
        const fila = mapa[i];
    
        for (let j = 0; j < fila.length; j++) {
            const celda = fila[j];
    
            if (celda === "p2-h") {
                score += 10;
            } else if (celda === "b") {
                let penalizado = false;
    
                // izquierda y derecha
                if (
                    (j > 0 && ["p2", "p2-h"].includes(fila[j - 1])) ||
                    (j < fila.length - 1 && ["p2", "p2-h"].includes(fila[j + 1]))
                ) {
                    score -= 3;
                    penalizado = true;
                }
    
                // abajo
                if (!penalizado && i < mapa.length - 1) {
                    const abajo = mapa[i + 1];
                    if (
                        (j > 0 && ["p2", "p2-h"].includes(abajo[j - 1])) ||
                        ["p2", "p2-h"].includes(abajo[j]) ||
                        (j < abajo.length - 1 && ["p2", "p2-h"].includes(abajo[j + 1]))
                    ) {
                        score -= 3;
                        penalizado = true;
                    }
                }
    
                // arriba
                if (!penalizado && i > 0) {
                    const arriba = mapa[i - 1];
                    if (
                        (j > 0 && ["p2", "p2-h"].includes(arriba[j - 1])) ||
                        ["p2", "p2-h"].includes(arriba[j]) ||
                        (j < arriba.length - 1 && ["p2", "p2-h"].includes(arriba[j + 1]))
                    ) {
                        score -= 3;
                        penalizado = true;
                    }
                }
    
                // si no hay nada cerca
                if (!penalizado) {
                    score -= 1;
                }
            }
        }
    }
    console.log("generar mapa :",mapa)
    
    return score
}




 //fin   
})  