'use strict';

(navigator.requestMIDIAccess() || Promise.reject())
    .then(access => {
        const  outputs = access.outputs();
        outputs.forEach(output => {
            output.send([0x90, 3, 32]);
        });
    });
