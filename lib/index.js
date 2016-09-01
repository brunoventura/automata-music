import World from './automata';
import Render from './render';
import { r110 } from './rules';

const render = new Render(100, 200);
const world = new World(100, 200, r110, render);
world.start();
const speed = document.querySelector("#speed");

const listener = function() {
    window.requestAnimationFrame(function() {
        setInterval(function () {
            world.renderNextLine();
        }, speed.value);
    });
};

speed.addEventListener("mousedown", function() {
    listener();
    speed.addEventListener("mousemove", listener);
});
speed.addEventListener("mouseup", function() {
    speed.removeEventListener("mousemove", listener);
});
