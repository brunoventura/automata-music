'use strict';

import playNote from './interceptors/audio';

class Automata {

    constructor(cells, lines, rule, render) {
        this.world = this.createWorld(cells, lines);
        this.rule = rule;
        this.render = render;
        this.pointer = {
            line: 0,
            cell: 0
        };
    }

    createWorld(cells, lines) {
        const world = []
        for (var i = 0; i < lines; i++) {
            world.push(new Uint8Array(cells));
        }
        return world;
    }

    start(seed = this.randomSeed()) {
        this.world[0] = seed;
    }

    randomSeed() {
        return this.world[0].map(cell => {
            return Math.random() >= 0.5 ? 1 : 0;
        });
    }

    generateLine(line) {
        this.world[line - 1].forEach((cell, i)=> {
            const right = this.world[line - 1][i + 1] || 0;
            const left = this.world[line - 1][i - 1] || 0;
            this.world[line][i] = this.rule(cell, right, left);
        });
    }

    renderNextLine() {
        if (this.pointer.line >= this.world.length) {
            return null;
        }

        playNote(this.world[this.pointer.line]);
        this.world[this.pointer.line].forEach(() => {
            this.renderNextCell();
        });
    }

    renderNextCell() {
        if (this.pointer.line >= this.world.length) {
            return null;
        }

        if (this.pointer.cell >= this.world[0].length) {
            this.pointer.line++;
            this.generateLine(this.pointer.line);
            this.pointer.cell = 0;
        }

        return this.render.renderCell(
            this.pointer.cell,
            this.pointer.line,
            this.world[this.pointer.line][this.pointer.cell++]
        );
    }

}

export default Automata;
