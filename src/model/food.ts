class Food {
    //定一个属性来表示食物对应的dom元素
    element: HTMLElement;
    constructor() {
        this.element = document.getElementById('food')!;
        this.reload();
    }
    // 定义一个获取食物坐标方法
    get x() {
        return this.element.offsetLeft;
    }
    get y() {
        return this.element.offsetTop;
    }
    private set x(val: number) {
        this.element.style.left = `${val}px`;
    }
    private set y(val: number) {
        this.element.style.top = `${val}px`;
    }
    // 修改食物位置的方法
    change(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    //向控制台输出食物位置
    printPos(): void {
        console.log(this.x, this.y);
    }

    // 生成食物随机位置
    gernerPos(): [
        x: number,
        y: number,
    ] {
        const screenWidth = 29;
        const x = parseInt(String(Math.random() * screenWidth)) * 10;
        const y = parseInt(String(Math.random() * screenWidth)) * 10;
        return [
            x,
            y
        ]
    }

    // 食物刷新
    reload(): void {
        let pos = this.gernerPos();
        this.change(...pos);
    }

}

export default Food