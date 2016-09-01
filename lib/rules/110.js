 'use strict';

const r110 = (cell, right, left) => {
    if (left && cell && right) {
        return 0;
    } else if (left && !cell && right) {
        return 1;
    } else if (!left && !cell && right) {
        return 1;
    } else {
        return cell;
    }
}

export default r110;
