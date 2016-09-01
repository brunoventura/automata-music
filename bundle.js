/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _automata = __webpack_require__(1);

	var _automata2 = _interopRequireDefault(_automata);

	var _render = __webpack_require__(5);

	var _render2 = _interopRequireDefault(_render);

	var _rules = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var render = new _render2.default(100, 200);
	var world = new _automata2.default(100, 200, _rules.r110, render);
	world.start();
	setInterval(function () {
	    world.renderNextLine();
	}, 400);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _audio = __webpack_require__(2);

	var _audio2 = _interopRequireDefault(_audio);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Automata = function () {
	    function Automata(cells, lines, rule, render) {
	        _classCallCheck(this, Automata);

	        this.world = this.createWorld(cells, lines);
	        this.rule = rule;
	        this.render = render;
	        this.pointer = {
	            line: 0,
	            cell: 0
	        };
	    }

	    _createClass(Automata, [{
	        key: 'createWorld',
	        value: function createWorld(cells, lines) {
	            var world = [];
	            for (var i = 0; i < lines; i++) {
	                world.push(new Uint8Array(cells));
	            }
	            return world;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var seed = arguments.length <= 0 || arguments[0] === undefined ? this.randomSeed() : arguments[0];

	            this.world[0] = seed;
	        }
	    }, {
	        key: 'randomSeed',
	        value: function randomSeed() {
	            return this.world[0].map(function (cell) {
	                return Math.random() >= 0.5 ? 1 : 0;
	            });
	        }
	    }, {
	        key: 'generateLine',
	        value: function generateLine(line) {
	            var _this = this;

	            this.world[line - 1].forEach(function (cell, i) {
	                var right = _this.world[line - 1][i + 1] || 0;
	                var left = _this.world[line - 1][i - 1] || 0;
	                _this.world[line][i] = _this.rule(cell, right, left);
	            });
	        }
	    }, {
	        key: 'renderNextLine',
	        value: function renderNextLine() {
	            var _this2 = this;

	            if (this.pointer.line >= this.world.length) {
	                return null;
	            }

	            (0, _audio2.default)(this.world[this.pointer.line], this.pointer.line);
	            this.world[this.pointer.line].forEach(function () {
	                _this2.renderNextCell();
	            });
	        }
	    }, {
	        key: 'renderNextCell',
	        value: function renderNextCell() {
	            if (this.pointer.line >= this.world.length) {
	                return null;
	            }

	            if (this.pointer.cell >= this.world[0].length) {
	                this.pointer.line++;
	                this.generateLine(this.pointer.line);
	                this.pointer.cell = 0;
	            }

	            return this.render.renderCell(this.pointer.cell, this.pointer.line, this.world[this.pointer.line][this.pointer.cell++]);
	        }
	    }]);

	    return Automata;
	}();

	exports.default = Automata;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _minor = __webpack_require__(3);

	var _minor2 = _interopRequireDefault(_minor);

	var _chord = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
	var time = 4;
	var currentProgression = void 0;

	var progression = [[0, 4, 5, 3], [0, 3, 4, 0], [0, 3, 0, 4], [0, 3, 4, 0], [3, 4, 0, 2], [3, 4, 0, 5], [3, 4, 1, 2], [3, 4, 1, 5]];

	var playNote = function playNote(line, offset) {
	    var init = line.length / 2 - 2;
	    var end = line.length / 2 + 1;
	    var index = parseInt(line.slice(init, end).join(''), 2);
	    synth.set("volume", -12);
	    synth.triggerAttackRelease(_minor2.default[1][index], "2n");
	    if (offset % time === 0) {
	        if (offset % (time * 4) === 0) {
	            console.log(index);
	            currentProgression = index;
	        }

	        synth.set("volume", 0);
	        synth.triggerAttackRelease((0, _chord.triad)(_minor2.default[0], progression[currentProgression][offset / time % time]), time + 'n');
	    }
	};

	exports.default = playNote;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var scales = [["C3", "D3", "Eb3", "F3", "G3", "A3", "B3", "C4"], ["C5", "D5", "Eb5", "F5", "G5", "A5", "B5", "C6"]];

	exports.default = scales;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var triad = function triad(scale, tonic) {
	    return [scale[tonic], scale[(tonic + 2) % scale.length], scale[(tonic + 4) % scale.length]];
	};

	exports.triad = triad;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CANVAS_SELECTOR = '#world';

	var Render = function () {
	    function Render(cells, lines) {
	        _classCallCheck(this, Render);

	        this.worldCanvas = document.querySelector(CANVAS_SELECTOR);
	        this.ctx = this.worldCanvas.getContext('2d');
	        this.cellWidth = this.worldCanvas.width / cells;
	        this.cellHeight = this.worldCanvas.width / lines;
	    }

	    _createClass(Render, [{
	        key: 'renderCell',
	        value: function renderCell(cell, line, value) {
	            this.ctx.fillStyle = value ? '#000' : '#FFF';
	            this.ctx.fillRect(cell * this.cellWidth, line * this.cellHeight, this.cellWidth, this.cellWidth);
	        }
	    }]);

	    return Render;
	}();

	exports.default = Render;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.r110 = undefined;

	var _ = __webpack_require__(7);

	var _2 = _interopRequireDefault(_);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.r110 = _2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var r110 = function r110(cell, right, left) {
	    if (left && cell && right) {
	        return 0;
	    } else if (left && !cell && right) {
	        return 1;
	    } else if (!left && !cell && right) {
	        return 1;
	    } else {
	        return cell;
	    }
	};

	exports.default = r110;

/***/ }
/******/ ]);