export var colors = ["red", "green", "blue", "white", "black"];
var Card = /** @class */ (function () {
    function Card(color, id) {
        this.visible = false;
        this.color = color;
        this.id = "card" + id;
    }
    return Card;
}());
export default Card;
