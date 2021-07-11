import Card, { colors } from "./card.js";
import { shuffle } from './helpers.js';
export var levelAndCountOfCard = {
    1: 4,
    2: 6,
    3: 8,
    4: 10
};
var Level = /** @class */ (function () {
    function Level(level) {
        this.level = level;
        this.cards = [];
        this.cardsCount = levelAndCountOfCard[this.level];
    }
    Level.prototype.renderCards = function () {
        var idColor = this.cardsCount / 2;
        var indexCard = 1;
        for (var i = 0; i < idColor; i += 1) {
            this.cards.push(new Card(colors[i], indexCard), new Card(colors[i], ++indexCard));
            ++indexCard;
        }
        shuffle(this.cards);
    };
    Level.prototype.renderLevel = function () {
        this.renderCards();
        var cardsOnPage = document.getElementById('cards');
        this.cards.forEach(function (card, index) {
            var oneCard = document.createElement('div');
            oneCard.className = "card";
            oneCard.id = card.id;
            cardsOnPage.append(oneCard);
        });
    };
    return Level;
}());
export default Level;
