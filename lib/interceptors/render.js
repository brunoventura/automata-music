'use strict';

const CANVAS_SELECTOR = '#world';
const CELL_HEIGHT = 10;
const CELL_WIDTH = 10;

class Render {

    constructor(lines) {
        this.worldCanvas = document.querySelector(CANVAS_SELECTOR);
        this.ctx = this.worldCanvas.getContext('2d');
        this.linePointer = 0;
        this.totalLines = lines;
    }

    renderLine(line) {
        if (this.linePointer > this.totalLines) {
            this.shiftContext.call(
                this,
                this.worldCanvas.width,
                this.worldCanvas.height,
                0,
                -CELL_WIDTH
            );
            this.linePointer = this.totalLines - 1;
        }
        
        line.forEach((value, cell) => {

            this.ctx.fillStyle = value ? '#000': '#FFF';
            this.ctx.fillRect(
                cell * CELL_WIDTH,
                this.linePointer * CELL_HEIGHT,
                CELL_WIDTH,
                CELL_HEIGHT,
            );
        });
        this.linePointer++;
    }

    shiftContext(w, h, dx, dy) {
        const clamp = (high, value) => Math.max(0, Math.min(high, value));
        const imageData = this.ctx.getImageData(
            clamp(w, -dx),
            clamp(h, -dy),
            clamp(w, w-dx),
            clamp(h, h-dy)
        );

        this.ctx.clearRect(0, 0, w, h);
        this.ctx.putImageData(imageData, 0, 0);
    }

}

export default Render;
