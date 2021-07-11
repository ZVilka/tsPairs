export const colors: string[] = ["red", "green", "blue", "white", "black"];

class Card {
    public visible = false;
    id: string;
    color: string;

    constructor(color: string, id: number) {
        this.color = color
        this.id = "card" + id;
    }
}

export default Card;
