'use strict';

import playNote from './interceptors/audio';

class Automata {

    constructor(cellsLength, linesLength, rule, render) {
        this.world = [];
        this.rule = rule;
        this.render = render;
        this.pointer = {
            line: 0,
            cell: 0
        };

        this.boundaries = {
            cellsLength,
            linesLength
        };
    }

    start(seed = this.randomSeed()) {
        this.world.push(seed);
    }

    randomSeed() {
        return new Uint8Array(this.boundaries.cellsLength).map(cell => {
            return Math.random() >= 0.5 ? 1 : 0;
        });
    }

    generateLine(line) {
        this.world.push(this.world[line - 1].map((cell, i)=> {
            const right = this.world[line - 1][i + 1] || 0;
            const left = this.world[line - 1][i - 1] || 0;
            return this.rule(cell, right, left);
        }));
    }

    renderNextLine() {
        if (this.pointer.line >= this.world.length) {
            return null;
        }

        playNote(this.world[this.pointer.line], this.pointer.line);
        this.world[this.pointer.line].forEach(() => {
            this.renderNextCell();
        });
    }

    renderNextCell() {
        if (this.boundaries.linesLength && this.pointer.line >= this.boundaries.linesLength) {
            return null;
        }

        if (this.pointer.cell >= this.boundaries.cellsLength) {
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
