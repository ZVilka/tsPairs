import Card from "./card.js";

export function removeElement(array: Array<Card>, elem: Card) {
    const index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export function shuffle(array: Array<Card>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
