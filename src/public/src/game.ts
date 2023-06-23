import { Direction, Entity } from './types.js';
import Snake from './snake.js';
import Apple from './apple.js';

class Game {
    container; canvas; ctx;
    entities: {
        snakes: Snake[],
        apples: Apple[],
    };
    paused = true;
    constructor(container: HTMLElement) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') ?? (() => {
            throw new Error('Unable to create canvas rendering context.');
        })();
        
        this.container.appendChild(this.canvas);
        new ResizeObserver(this.fullscreen.bind(this)).observe(this.container);
        this.fullscreen();

        this.entities = {
            snakes: new Array(1).fill(null).map(() => new Snake(this)),
            apples: new Array(3).fill(null).map(() => new Apple(this)),
        };

        document.body.addEventListener('keydown', (event) => {
            if(!this.entities.snakes[0]) return;
            switch(event.key) {
                case 'w':
                    this.entities.snakes[0].setDirection(Direction.Up);
                    break;
                case 's':
                    this.entities.snakes[0].setDirection(Direction.Down);
                    break;
                case 'a':
                    this.entities.snakes[0].setDirection(Direction.Left);
                    break;
                case 'd':
                    this.entities.snakes[0].setDirection(Direction.Right);
                    break;
            }
        });
        
        setInterval(() => {
            this.update();
            this.render();
        }, 100);
    }
    private fullscreen() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }
    private loopEntities(callback: (entity: Entity) => void) {
        let key: keyof typeof this.entities;
        for(key in this.entities)
            this.entities[key].forEach((entity) => {
                callback(entity);
            });
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
    update() {
        if(this.paused) return;
        this.loopEntities((entity) => {
            entity.update();
        });
    }
    render() {
        this.ctx.fillStyle = '#111111';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.loopEntities((entity) => {
            entity.render();
        });
    }
}

export default Game;