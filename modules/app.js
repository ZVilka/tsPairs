import { textMessages } from "./timer.js";
import Game from "./game.js";
var App = /** @class */ (function () {
    function App() {
        this.game = new Game();
        this.restart = document.getElementById('restart');
        this.surrender = document.getElementById('surrender');
    }
    App.prototype.onclickRestart = function () {
        var answer = confirm('Вы действительно хотите начать заново?');
        if (answer) {
            clearInterval(this.game.currentTime);
            document.getElementById('cards').innerHTML = '';
            this.game = new Game();
            this.game.startGame();
        }
        return;
    };
    App.prototype.onclickSurrender = function () {
        var answer = confirm('Вы действительно хотите закончить игру?');
        if (answer) {
            clearInterval(this.game.currentTime);
            this.game.timer.addMessageHTML(textMessages['endGame']);
            alert("\u0412\u044B \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0438 \u0438\u0433\u0440\u0443 \u0438 \u043D\u0430\u0431\u0440\u0430\u043B\u0438 " + Game.points + " \u043E\u0447\u043A\u043E\u0432");
        }
        return;
    };
    App.prototype.run = function () {
        this.restart.addEventListener('click', this.onclickRestart.bind(this));
        this.surrender.addEventListener('click', this.onclickSurrender.bind(this));
        this.game.startGame();
    };
    return App;
}());
export default App;
