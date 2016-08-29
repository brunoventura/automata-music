'use strict';

const r110 = (cell, right, left) => {
    if (cell && left && right) {
        return 0;
    } else if (!cell && left && right) {
        return 1;
    } else if (!cell && !left && right) {
        return 1;
    } else {
        return cell;
    }
}

export default r110;
