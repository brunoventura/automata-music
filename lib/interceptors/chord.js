'use strict';

const triad = (scale, tonic) => ([
    scale[tonic],
    scale[(tonic + 2) % scale.length],
    scale[(tonic + 4) % scale.length]
]);

export { triad };
