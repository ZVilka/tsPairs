import Timer, {textMessages} from "./timer.js";
import Game from "./game.js";

class App {
    game = new Game();
    restart: HTMLElement;
    surrender: HTMLElement;

    constructor() {
        this.restart = document.getElementById('restart');
        this.surrender = document.getElementById('surrender');
    }

    onclickRestart() {
        const answer = confirm('Вы действительно хотите начать заново?');
        if (answer) {
            clearInterval(this.game.currentTime);
            document.getElementById('cards').innerHTML = '';
            this.game = new Game();
            this.game.startGame();
        }
        return;
    }

    onclickSurrender() {
        const answer = confirm('Вы действительно хотите закончить игру?');
        if (answer) {
            clearInterval(this.game.currentTime);
            this.game.timer.addMessageHTML(textMessages['endGame']);
            alert(`Вы закончили игру и набрали ${Game.points} очков`)
        }
        return;
    }

    run() {
        this.restart.addEventListener('click', this.onclickRestart.bind(this));
        this.surrender.addEventListener('click', this.onclickSurrender.bind(this));
        this.game.startGame();
    }
}


export default App;
