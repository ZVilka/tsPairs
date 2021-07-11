import Card from "./card.js";
import Timer, { textMessages } from "./timer.js";
import Level, { levelAndCountOfCard } from "./level.js";
import { removeElement } from './helpers.js'

class Game {
    timer: Timer;
    currentTime: NodeJS.Timeout | undefined;
    level: Level | undefined;
    cards: Array<Card> | undefined;
    openedCard: Card | undefined;

    constructor(time: number = 100) {
        this.timer = new Timer(time);
        this.currentTime = undefined;
        this.level = new Level(1);
        this.cards = this.level.cards;
        this.openedCard = undefined;
    }

    public static points: number = 0;

    lessTime() {
        this.timer.timeInSec -= 10;
        if (this.timer.timeInSec <= 0) {
            clearInterval(this.currentTime);
            this.timer.addMessageHTML(textMessages['message']);
            alert('Время вышло!');
        }
        document.getElementById('timer').classList.add('redText');
        setTimeout(() => {
            document.getElementById('timer').classList.remove('redText');
        }, 400);
    }

    renderNewLevel() {
        document.getElementById('cards').innerHTML = '';
        this.level = new Level(++this.level.level);
        this.cards = this.level.cards;
        this.level.renderLevel();
        this.game();
    }

    checkGameState() {
        if (this.cards.length === 0) {
            if (this.level.level < Object.keys(levelAndCountOfCard).length) {
                this.renderNewLevel();
            } else {
                alert(`Вы прошли игру и набрали ${Game.points} очков`);
            }
        }
    }

    reverseCard(event: Event): EventListener {
        const currentCardHTML = event.target as HTMLElement;
        const currentCard = this.cards.find((card) => card.id === currentCardHTML.id);
            if (this.timer.timeInSec <= 0) {
            clearInterval(this.currentTime);
            alert(`Время вышло. Вы набрали ${Game.points} очков`);
            return;
        }
        currentCardHTML.classList.add('rotate', currentCard.color);
        setTimeout(() => {
            if (this.openedCard) {
                //event.stopPropagation();
                let openedCardHTML = document.getElementById(this.openedCard.id);
                if (this.openedCard.color === currentCard.color && openedCardHTML !== currentCardHTML) {
                    Game.points += 10;
                    document.getElementById('score-count').innerText = " " + Game.points;
                    currentCardHTML.classList.add('hidden');
                    openedCardHTML.classList.add('hidden');
                    removeElement(this.cards, this.openedCard);
                    removeElement(this.cards, currentCard);
                } else {
                    currentCardHTML.classList.remove('rotate', currentCard.color);
                    openedCardHTML.classList.remove('rotate', this.openedCard.color);
                    this.lessTime();
                    if (Game.points >= 10) {
                        Game.points -= 10;
                        document.getElementById('score-count').innerText = " " + Game.points;
                    }
                }
                this.openedCard = undefined;
            } else {
                this.openedCard = currentCard;
            }
            this.checkGameState();
            return;
        },500);

    }

    game() {
        for (let i = 0; i < this.cards.length; i++) {
            let currentCard = this.cards[i];
            let card = document.getElementById(currentCard.id);
            card.addEventListener('click', this.reverseCard.bind(this));
        }
    }

    startGame() {
        this.level.renderLevel();
        this.currentTime = this.timer.getTimer();
        this.game();
    }
}

export default Game;
