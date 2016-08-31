'use strict';

import bluesScale from '../scales/blues';

const synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

const octave = 4;

const playNote = line => {
    const init = (line.length / 2) - 3;
    const end = (line.length / 2) + 3;
    const chords = line.slice(init, end).reduce((array, cell, i) => {
        if (cell) {
            array.push(bluesScale[i]);
        }
        return array;
    }, []);
    chords.forEach(chord => {
        synth.triggerAttackRelease(chord, "2n");
    })
};

export default playNote;
