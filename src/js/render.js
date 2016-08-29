'use strict';

const CANVAS_SELECTOR = '#world'

class Render {

    constructor(cells, lines) {
        this.worldCanvas = document.querySelector(CANVAS_SELECTOR);
        this.ctx = this.worldCanvas.getContext('2d');
        this.cellWidth = this.worldCanvas.width / cells;
        this.cellHeight = this.worldCanvas.width / lines;
    }

    renderCell(cell, line, value) {
        this.ctx.fillStyle = value ? '#000': '#FFF';
        this.ctx.fillRect(
            cell * this.cellWidth,
            line * this.cellHeight,
            this.cellWidth,
            this.cellWidth,
        );
    }
}

export default Render;
