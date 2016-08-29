# Automata Music

The project is a Cellular Automata who generates Non-deterministic music. They be concepted @ BrazilJS 2016 to be a blend of some talks.

# Installation

```
npm install
```

# Development
This task will run nodemon, and compile js to browser when something modify.
```
npm run dev
```

# Todo

1. ~~Create automata generation with a single rule~~
2. Create music based on the automata generation
2. Select desired rule

# Concepts

##### Cellular automata
A cellular automaton consists of a regular grid of cells, each in one of a finite number of states, such as on and off (in contrast to a coupled map lattice). The grid can be in any finite number of dimensions. For each cell, a set of cells called its neighborhood is defined relative to the specified cell. An initial state (time t = 0) is selected by assigning a state for each cell. A new generation is created (advancing t by 1), according to some fixed rule (generally, a mathematical function) that determines the new state of each cell in terms of the current state of the cell and the states of the cells in its neighborhood. Typically, the rule for updating the state of cells is the same for each cell and does not change over time, and is applied to the whole grid simultaneously, though exceptions are known, such as the stochastic cellular automaton and asynchronous cellular automaton. [Read More
](https://en.wikipedia.org/wiki/Cellular_automaton)

#### Non-deterministic music
Non-deterministic music (Biles 2002), or music that cannot be repeated, for example, ordinary wind chimes (Dorin 2001). This perspective comes from the broader generative art movement. This revolves around the idea that music, or sounds may be "generated" by a musician "farming" parameters within an ecology, such that the ecology will perpetually produce different variation based on the parameters and algorithms used. An example of this technique is Joseph Nechvatal's Viral symphOny: a collaborative electronic noise music symphony[1] created between the years 2006 and 2008 using custom artificial life software based on a viral model. [Read More](https://en.wikipedia.org/wiki/Generative_music#Biological.2Femergent)

# Inspirations
[@rumyra](https://twitter.com/rumyra) Talk @ BrazilJS2016 about MIDI

[@_lrlna](https://twitter.com/_lrlna) Talk @ BrazilJS2016 about Cellular Automata

[@willian_justen](https://twitter.com/willian_justen) Talk @ BrazilJS2016 about JS + Music

[WolframTones](http://tones.wolfram.com/)

# Contributing
Fell free to contribute. Needs a better name (give suggestions in a issue)
