// 引入被操控的类
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake'


export default class GameControl {
    // 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    isStop: boolean = false;
    timer: any;
    canChangeDir: boolean = true;
    msg: HTMLElement;
    /*
         ArrowUp
         ArrowRight
         ArrowDown
         ArrowLeft
    */

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.msg = document.getElementById('msg')!;
        this.init();
    }
    runSnake = () => {
        if (this.isStop) {
            return;
        }
        let msg = this.snake.run();
        if (msg) {
            this.alert(msg);
            clearInterval(this.timer);
            this.reload();
        }
        let { x, y } = this.snake.headPos;
        this.checkEat(x, y);
        this.canChangeDir = true;
    }

    init() {
        // 绑定按键按下的事件
        document.addEventListener('keydown', this.keydownHandler)
        this.timer = setInterval(this.runSnake, 300 - this.scorePanel.level * 30 + 30);
    }

    alert(msg: string) {
        this.msg.innerHTML = msg;
        this.msg.style.opacity = '1';
        setTimeout(() => {
            this.msg.style.opacity = '0';
        }, 500);
    }

    reload() {
        this.food.reload();
        this.scorePanel.reload();
        this.snake.reload();
        this.isStop = false;
        clearInterval(this.timer);
        this.init();
    }

    changeSpeed() {
        clearInterval(this.timer);
        this.alert('小蛇蛇变强了');
        this.timer = setInterval(this.runSnake, 300 - this.scorePanel.level * 30 + 30);
    }

    //创建一个键盘响应函数
    keydownHandler = (event: KeyboardEvent) => {
        let direction = this.snake.direction;
        if (!this.canChangeDir) {
            return;
        }
        switch (event.key) {
            // 向上移动
            case "ArrowUp":
                if (this.snake.direction === 'ArrowRight' || this.snake.direction === 'ArrowLeft') {
                    this.snake.direction = event.key;
                }
                break;
            case "ArrowRight":
                if (this.snake.direction === 'ArrowDown' || this.snake.direction === 'ArrowUp') {
                    this.snake.direction = event.key;
                }
                break;
            case "ArrowDown":
                if (this.snake.direction === 'ArrowRight' || this.snake.direction === 'ArrowLeft') {
                    this.snake.direction = event.key;
                }
                break;
            case "ArrowLeft":
                if (this.snake.direction === 'ArrowDown' || this.snake.direction === 'ArrowUp') {
                    this.snake.direction = event.key;
                }
                break;
            case " ":
                this.isStop = !this.isStop;
                setTimeout(() => {
                    this.canChangeDir = true;
                })
                break;
            default:
                break;
        }
        this.canChangeDir = false;
        if (this.isStop) {
            this.canChangeDir = true;
            this.snake.direction = direction;
        }
    }



    checkEat(x: number, y: number) {
        if (x === this.food.x && y === this.food.y) {
            this.food.reload();
            this.scorePanel.addScore(this.changeSpeed.bind(this));

            const lastBody = this.snake.bodies[this.snake.bodies.length - 1] as HTMLElement;
            this.snake.addBody(lastBody.offsetLeft, lastBody.offsetTop);
        }
    }

}