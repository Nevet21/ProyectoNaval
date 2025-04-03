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

    function añadirBarco(user,barco, startId){
        const BloquesTablero= document.querySelectorAll(`#${user} div`)
        let randomBoolean = Math.random() < 0.5
        let isHorizontal = user=== 'player' ? angle===0 : randomBoolean
        let randomStartIndex = Math.floor(Math.random()*tamaño*tamaño)
        
        let startIndex = startId ? startId : randomStartIndex

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

        if (valid && notTaken){
            bloquesBarco.forEach(bloqueBarco =>{
                bloqueBarco.classList.add(barco.nombre)
                bloqueBarco.classList.add('taken')
            })
        } else{
            if (user === 'computer') añadirBarco('computer',barco,null)
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
    }

    function dropShip(e){
        const startId=e.target.id
        const barco = barcos.find(b => b.nombre === barcoMovido.dataset.nombre);
        añadirBarco('player',barco, startId)
        if(!notDropped){
            barcoMovido.remove()
        }
    }


 //fin   
})  