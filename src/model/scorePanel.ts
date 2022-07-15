export default class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number;
    upScore: number;
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore(changeSpeed: any): void {
        if (this.score >= this.upScore * this.maxLevel) {
            console.log('你已经通关了')
            return;
        }
        this.scoreEle.innerHTML = ++this.score + '';
        if (this.score % this.upScore === 0) {
            this.levelUp();
            changeSpeed();
        }
    }
    levelUp(): void {
        if (this.level >= this.maxLevel) {
            return;
        }
        this.levelEle.innerHTML = ++this.level + '';
    }

    reload() {
        this.score = 0;
        this.level = 1;
        this.scoreEle.innerHTML = this.score + '';
        this.levelEle.innerHTML = this.level + '';
    }
}