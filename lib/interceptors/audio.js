'use strict';

import scale from '../scales/minor';
import { triad } from './chord';

const synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
const time = 4;

const progression = [0, 4, 5, 3];
const playNote = (line, offset) => {
    const init = (line.length / 2) - 2;
    const end = (line.length / 2) + 1;
    const index = parseInt(line.slice(init, end).join(''), 2);

    console.log(synth);
    synth.set("volume", -12);
    synth.triggerAttackRelease(scale[1][index], "2n");
    if (offset % time === 0) {
        synth.set("volume", 0);
        synth.triggerAttackRelease(triad(scale[0], progression[(offset / time) % time]), `${time}n`);
    }
};

export default playNote;
