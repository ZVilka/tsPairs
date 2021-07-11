import Timer, { textMessages } from "./timer.js";
import Level, { levelAndCountOfCard } from "./level.js";
import { removeElement } from './helpers.js';
var Game = /** @class */ (function () {
    function Game(time) {
        if (time === void 0) { time = 100; }
        this.timer = new Timer(time);
        this.currentTime = undefined;
        this.level = new Level(1);
        this.cards = this.level.cards;
        this.openedCard = undefined;
    }
    Game.prototype.lessTime = function () {
        this.timer.timeInSec -= 10;
        if (this.timer.timeInSec <= 0) {
            clearInterval(this.currentTime);
            this.timer.addMessageHTML(textMessages['message']);
            alert('Время вышло!');
        }
        document.getElementById('timer').classList.add('redText');
        setTimeout(function () {
            document.getElementById('timer').classList.remove('redText');
        }, 400);
    };
    Game.prototype.renderNewLevel = function () {
        document.getElementById('cards').innerHTML = '';
        this.level = new Level(++this.level.level);
        this.cards = this.level.cards;
        this.level.renderLevel();
        this.game();
    };
    Game.prototype.checkGameState = function () {
        if (this.cards.length === 0) {
            if (this.level.level < Object.keys(levelAndCountOfCard).length) {
                this.renderNewLevel();
            }
            else {
                alert("\u0412\u044B \u043F\u0440\u043E\u0448\u043B\u0438 \u0438\u0433\u0440\u0443 \u0438 \u043D\u0430\u0431\u0440\u0430\u043B\u0438 " + Game.points + " \u043E\u0447\u043A\u043E\u0432");
            }
        }
    };
    Game.prototype.reverseCard = function (event) {
        var _this = this;
        var currentCardHTML = event.target;
        var currentCard = this.cards.find(function (card) { return card.id === currentCardHTML.id; });
        if (this.timer.timeInSec <= 0) {
            clearInterval(this.currentTime);
            alert("\u0412\u0440\u0435\u043C\u044F \u0432\u044B\u0448\u043B\u043E. \u0412\u044B \u043D\u0430\u0431\u0440\u0430\u043B\u0438 " + Game.points + " \u043E\u0447\u043A\u043E\u0432");
            return;
        }
        currentCardHTML.classList.add('rotate', currentCard.color);
        setTimeout(function () {
            if (_this.openedCard) {
                //event.stopPropagation();
                var openedCardHTML = document.getElementById(_this.openedCard.id);
                if (_this.openedCard.color === currentCard.color && openedCardHTML !== currentCardHTML) {
                    Game.points += 10;
                    document.getElementById('score-count').innerText = " " + Game.points;
                    currentCardHTML.classList.add('hidden');
                    openedCardHTML.classList.add('hidden');
                    removeElement(_this.cards, _this.openedCard);
                    removeElement(_this.cards, currentCard);
                }
                else {
                    currentCardHTML.classList.remove('rotate', currentCard.color);
                    openedCardHTML.classList.remove('rotate', _this.openedCard.color);
                    _this.lessTime();
                    if (Game.points >= 10) {
                        Game.points -= 10;
                        document.getElementById('score-count').innerText = " " + Game.points;
                    }
                }
                _this.openedCard = undefined;
            }
            else {
                _this.openedCard = currentCard;
            }
            _this.checkGameState();
            return;
        }, 500);
    };
    Game.prototype.game = function () {
        for (var i = 0; i < this.cards.length; i++) {
            var currentCard = this.cards[i];
            var card = document.getElementById(currentCard.id);
            card.addEventListener('click', this.reverseCard.bind(this));
        }
    };
    Game.prototype.startGame = function () {
        this.level.renderLevel();
        this.currentTime = this.timer.getTimer();
        this.game();
    };
    Game.points = 0;
    return Game;
}());
export default Game;
