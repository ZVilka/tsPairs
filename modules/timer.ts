export const textMessages: { [prop: string] : string} = {
    'time': "<span id=\"timer-min\"></span><span id=\"timer-sec\"></span>",
    'message': "<span class=\"message\" id=\"message\">Время вышло!</span>",
    'endGame': "<span class=\"message\" id=\"message\">Игра окончена!</span>"
}

class Timer {
    min: number;
    sec: number;
    timerHTML: HTMLElement;

    constructor(public timeInSec: number) {
        this.min = Math.floor(this.timeInSec / 60);
        this.sec = this.timeInSec % 60;
        this.timerHTML = document.getElementById('timer');
    }

    addMessageHTML(message: string) {
        this.timerHTML.innerHTML = message;
    }

    getTimer() {
        const timer = setInterval(() => {
            this.timeInSec -= 1
            if (this.timeInSec > 0) {
                if (this.timerHTML.childNodes.length < 2) {
                    this.addMessageHTML(textMessages['time']);
                }
                this.min = Math.floor(this.timeInSec / 60);
                this.sec = this.timeInSec % 60;
                document.getElementById('timer-min').innerHTML = ('0' + this.min).slice(-2) + ' : ';
                document.getElementById('timer-sec').innerHTML = ('0' + this.sec).slice(-2);
            } else {
                this.addMessageHTML(textMessages['message']);
                clearInterval(timer);
            }
        },1000);

        setTimeout(() => { clearInterval(timer); }, this.timeInSec * 1000);
        return timer;
    }
}

export default Timer;
