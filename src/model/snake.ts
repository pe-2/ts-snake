export default class Snake {
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;
    direction: string = 'ArrowRight';
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelectorAll('#snake>div')[0] as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')!
    }
    get headPos(): { x: number, y: number } {
        return {
            x: this.head.offsetLeft,
            y: this.head.offsetTop,
        }
    }
    private set headPos(pos: { x: number, y: number }) {
        this.head.style.left = `${pos.x}px`;
        this.head.style.top = `${pos.y}px`;
    }

    setHeadPos(x: number, y: number) {
        if (x < 0 || x > 290) {
            return '蛇撞墙了';
        }
        if (y < 0 || y > 290) {
            return '蛇撞墙了';
        }
        for (let i = this.bodies.length - 1; i > 1; i--) {
            let body = this.bodies[i] as HTMLElement;
            if (x === body.offsetLeft && y === body.offsetTop) {
                return '蛇撞到自己了';
            }
        }
        this.setBodyPos();
        this.headPos = {
            x,
            y
        }
    }
    setBodyPos() {
        let x: number, y: number;
        for (let i = this.bodies.length - 1; i > 0; i--) {

            let nextBody = this.bodies[i - 1] as HTMLElement;
            x = nextBody.offsetLeft;
            y = nextBody.offsetTop;

            let body = this.bodies[i] as HTMLElement;
            body.style.left = x + 'px';
            body.style.top = y + 'px';

        }
    }

    addBody(x: number, y: number) {
        this.element.insertAdjacentHTML('beforeend', "<div></div>");
        const lastBody = this.bodies[this.bodies.length - 1] as HTMLElement;
        lastBody.style.left = x + 'px';
        lastBody.style.top = y + 'px';
    }

    reload() {
        document.getElementById('snake')!.innerHTML = '<div></div><div></div>';
        this.element = document.getElementById('snake')!;
        this.head = document.querySelectorAll('#snake>div')[0] as HTMLElement;
        this.bodies = document.getElementById('snake')!.getElementsByTagName('div')!;
        this.direction = 'ArrowRight';
    }

    run() {
        let { x, y } = this.headPos;
        switch (this.direction) {
            // 向上移动
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowLeft":
                x -= 10;
                break;
            default:
                break;
        }

        return this.setHeadPos(x, y);

    }
}