import World from './automata';
import Render from './render';
import { r110 } from './rules';
import midi from './interceptors/midi';

console.log(r110)

const render = new Render(100, 100);
const world = new World(100, 100, r110, render);
world.start();
setInterval(function () {
    world.renderNextLine();
}, 50);
