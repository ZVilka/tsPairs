export var textMessages = {
    'time': "<span id=\"timer-min\"></span><span id=\"timer-sec\"></span>",
    'message': "<span class=\"message\" id=\"message\">Время вышло!</span>",
    'endGame': "<span class=\"message\" id=\"message\">Игра окончена!</span>"
};
var Timer = /** @class */ (function () {
    function Timer(timeInSec) {
        this.timeInSec = timeInSec;
        this.min = Math.floor(this.timeInSec / 60);
        this.sec = this.timeInSec % 60;
        this.timerHTML = document.getElementById('timer');
    }
    Timer.prototype.addMessageHTML = function (message) {
        this.timerHTML.innerHTML = message;
    };
    Timer.prototype.getTimer = function () {
        var _this = this;
        var timer = setInterval(function () {
            _this.timeInSec -= 1;
            if (_this.timeInSec > 0) {
                if (_this.timerHTML.childNodes.length < 2) {
                    _this.addMessageHTML(textMessages['time']);
                }
                _this.min = Math.floor(_this.timeInSec / 60);
                _this.sec = _this.timeInSec % 60;
                document.getElementById('timer-min').innerHTML = ('0' + _this.min).slice(-2) + ' : ';
                document.getElementById('timer-sec').innerHTML = ('0' + _this.sec).slice(-2);
            }
            else {
                _this.addMessageHTML(textMessages['message']);
                clearInterval(timer);
            }
        }, 1000);
        setTimeout(function () { clearInterval(timer); }, this.timeInSec * 1000);
        return timer;
    };
    return Timer;
}());
export default Timer;
