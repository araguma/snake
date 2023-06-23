import { gridSize } from './config.js';
import { Entity, Coordinate } from "./types.js";
import Game from './game.js';

class Apple implements Entity {
    game;
    location: Coordinate = {
        x: -1,
        y: -1,
    };
    constructor(game: Game) {
        this.game = game;
        this.randomize();
    }
    randomize() {
        this.location = {
            x: Math.floor(Math.random() * (this.game.canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (this.game.canvas.height / gridSize)) * gridSize,
        }
    }
    update() {

    }
    render() {
        this.game.ctx.fillStyle = '#e74c3c';
        this.game.ctx.fillRect(this.location.x, this.location.y, gridSize, gridSize);
    }
}

export default Apple;