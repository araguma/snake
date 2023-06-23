import { gridSize } from './config.js';
import { Entity, Vector, Direction } from './types.js';
import Game from './game.js';

class Snake implements Entity {
    game;
    direction = Direction.Up;
    nextDirection = this.direction;
    body: Vector[] = [];
    length = 3;
    constructor(game: Game) {
        this.game = game;
        this.body[0] = {
            x: Math.floor(this.game.canvas.width / gridSize / 2) * gridSize,
            y: Math.floor(this.game.canvas.height / gridSize / 2) * gridSize,
        }
    }
    setDirection(direction: Vector) {
        if(this.direction === Direction.Up && direction === Direction.Down) return;
        if(this.direction === Direction.Down && direction === Direction.Up) return;
        if(this.direction === Direction.Left && direction === Direction.Right) return;
        if(this.direction === Direction.Right && direction === Direction.Left) return;
        this.nextDirection = direction;
    }
    update() {
        this.direction = this.nextDirection;
        this.body.unshift({
            x: this.body[0].x + this.direction.x * gridSize,
            y: this.body[0].y + this.direction.y * gridSize,
        });
        while(this.body.length > this.length)
            this.body.pop();
        
        this.body.forEach((segment, i) => {
            this.game.entities.apples.forEach((apple) => {
                if(segment.x === apple.location.x && segment.y === apple.location.y) {
                    this.length += 1;
                    apple.randomize();
                }
            })
            for(let j = 0; j < this.body.length; j ++) {
                if(segment === this.body[j]) continue;
                if(segment.x === this.body[j].x && segment.y === this.body[j].y) {
                    this.length = i - 1;
                }
            }
        });
    }
    render() {
        this.game.ctx.fillStyle = '#2ecc71';
        this.body.forEach((segment) => {
            this.game.ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
    }
}

export default Snake;