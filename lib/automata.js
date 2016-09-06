'use strict';

class Automata {

    constructor(cellsLength, linesLength, rule) {
        this.world = [];
        this.rule = rule;
        this.interceptors = {};
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

    generateLine() {
        const linePointer = this.pointer.line++;
        const line = this.world[linePointer].map((cell, i)=> {
            const right = this.world[linePointer][i + 1] || 0;
            const left = this.world[linePointer][i - 1] || 0;
            return this.rule(cell, right, left);
        });
        this.executeInterceptors('line', line);
        this.world.push(line);
    }

    registryInterceptor(event, fn) {
        if (!this.interceptors[event]) {
            this.interceptors[event] = [];
        }

        this.interceptors[event].push(fn);
    }

    executeInterceptors(event, value) {
        this.interceptors[event].forEach(fn => fn(value));
    }
}

export default Automata;
