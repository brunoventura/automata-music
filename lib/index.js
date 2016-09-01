import World from './automata';
import Render from './render';
import { r110 } from './rules';

const render = new Render(100, 200);
const world = new World(100, null, r110, render);
world.start();
const speed = document.querySelector("#speed");

const timer = time => {
    setTimeout(() => {
        world.renderNextLine();
        timer(speed.value);
    }, time);
}
timer(speed.value);
