import Game from './game.js';

const container = document.getElementById('game-container') ?? (() => {
    throw new Error('Unable to retrive game container.');
})();

const game = new Game(container);
game.resume();