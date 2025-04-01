import { Player } from "./Player.js";
import { Board } from "./Board.js";
import { WeatherAPI } from "../api/weatherAPI.js";
import { ScoreAPI } from "../api/scoreAPI.js";
import { Renderer } from "../ui/Renderer.js";
import { Events } from "../ui/Events.js";


class Game {
    constructor() {
        this.player = null;
        this.ai = new Player("Máquina", "AI");
        this.board = null;
        this.weather = new WeatherAPI();
        this.renderer = new Renderer();
        this.events = new Events(this);
        this.currentTurn = "player";
    }

    async startGame() {
        const nickname = prompt("Ingrese su nickname:");
        const country = await ScoreAPI.getCountry();

        if (!nickname || !country) {
            alert("Debe ingresar un nickname y seleccionar un país válido.");
            return;
        }
        
        this.player = new Player(nickname, country);
        const dimensions = this.getBoardSize();
        this.board = new Board(dimensions.rows, dimensions.columns);
        
        this.weather.fetchWeather();
        this.board.initializeShips(this.player, this.ai);
        
        this.startTurns();
    }

    getBoardSize() {
        let rows, columns;
        do {
            rows = parseInt(prompt("Ingrese el número de filas (10-20):"));
            columns = parseInt(prompt("Ingrese el número de columnas (10-20):"));
        } while (isNaN(rows) || isNaN(columns) || rows < 10 || rows > 20 || columns < 10 || columns > 20);
        
        return { rows, columns };
    }

    startTurns() {
        alert("¡El juego ha comenzado! Tú inicias la partida.");
        this.playerTurn();
    }

    playerTurn() {
        console.log("Turno del jugador");
        this.renderer.enableBoardClicks((row, col) => {
            const hit = this.board.attack(this.ai, row, col);
            if (hit) {
                alert("¡Impacto! Puedes volver a jugar.");
                this.renderer.updateBoard(row, col, "hit");
            } else {
                alert("¡Fallaste! Turno de la máquina.");
                this.renderer.updateBoard(row, col, "miss");
                setTimeout(() => this.aiTurn(), 1000);
            }
        });
    }

    aiTurn() {
        console.log("Turno de la máquina");
        let row, col;
        do {
            row = Math.floor(Math.random() * this.board.rows);
            col = Math.floor(Math.random() * this.board.columns);
        } while (this.board.alreadyAttacked(row, col));

        const hit = this.board.attack(this.player, row, col);
        if (hit) {
            alert("¡La máquina te ha impactado!");
            this.renderer.updateBoard(row, col, "hit", "player");
            setTimeout(() => this.aiTurn(), 1000);
        } else {
            alert("¡La máquina ha fallado! Tu turno.");
            this.renderer.updateBoard(row, col, "miss", "player");
            setTimeout(() => this.playerTurn(), 1000);
        }
    }
}

export default Game;
