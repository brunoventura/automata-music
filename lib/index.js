import World from './automata';
import Render from './interceptors/render';
import music from './interceptors/audio';
import { r110 } from './rules';

const render = new Render(30);
const world = new World(100, null, r110, render);

world.registryInterceptor('line', render.renderLine.bind(render));
world.registryInterceptor('line', music);
world.start();
const speed = document.querySelector("#speed");

const timer = time => {
    setTimeout(() => {
        world.generateLine();
        timer(speed.value);
    }, time);
}
timer(speed.value);
