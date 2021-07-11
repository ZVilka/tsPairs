import Card, {colors} from "./card.js";
import { shuffle } from './helpers.js';

export const levelAndCountOfCard: { [prop: number] : number} = {
    1: 4,
    2: 6,
    3: 8,
    4: 10
}

class Level {
    cardsCount: number;
    cards: Array<Card> = [];

    constructor(public level: number) {
        this.cardsCount = levelAndCountOfCard[this.level];
    }

    renderCards() {
        const idColor = this.cardsCount / 2;
        let indexCard = 1;
        for (let i = 0; i < idColor; i+=1) {
            this.cards.push(new Card(colors[i], indexCard), new Card(colors[i], ++indexCard));
            ++indexCard;
        }
        shuffle(this.cards);
    }

    renderLevel() {
        this.renderCards();
        let cardsOnPage = document.getElementById('cards');
        this.cards.forEach((card, index) => {
            let oneCard = document.createElement('div');
            oneCard.className = "card";
            oneCard.id = card.id;
            cardsOnPage.append(oneCard);
        });
    }
}

export default Level;
