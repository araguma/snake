import { gridSize } from './config.js';
import { Entity, Coordinate, Direction } from './types.js';
import Game from './game.js';

class Snake implements Entity {
    game;
    direction = Direction.Up;
    body: Coordinate[] = [];
    length = 3;
    constructor(game: Game) {
        this.game = game;
        this.body[0] = {
            x: Math.floor(this.game.canvas.width / gridSize / 2) * gridSize,
            y: Math.floor(this.game.canvas.height / gridSize / 2) * gridSize,
        }
    }
    update() {
        this.body.unshift({
            x: this.body[0].x + this.direction.x * gridSize,
            y: this.body[0].y + this.direction.y * gridSize,
        });
        if(this.body.length > this.length)
            this.body.pop();
    }
    render() {
        this.game.ctx.fillStyle = '#2ecc71';
        this.body.forEach((segment) => {
            this.game.ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });
    }
}

export default Snake;