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

	var _render = __webpack_require__(2);

	var _render2 = _interopRequireDefault(_render);

	var _audio = __webpack_require__(3);

	var _audio2 = _interopRequireDefault(_audio);

	var _rules = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var render = new _render2.default(30);
	var world = new _automata2.default(100, null, _rules.r110, render);

	world.registryInterceptor('line', render.renderLine.bind(render));
	world.registryInterceptor('line', _audio2.default);
	world.start();
	var speed = document.querySelector("#speed");

	var timer = function timer(time) {
	    setTimeout(function () {
	        world.generateLine();
	        timer(speed.value);
	    }, time);
	};
	timer(speed.value);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Automata = function () {
	    function Automata(cellsLength, linesLength, rule) {
	        _classCallCheck(this, Automata);

	        this.world = [];
	        this.rule = rule;
	        this.interceptors = {};
	        this.pointer = {
	            line: 0,
	            cell: 0
	        };

	        this.boundaries = {
	            cellsLength: cellsLength,
	            linesLength: linesLength
	        };
	    }

	    _createClass(Automata, [{
	        key: 'start',
	        value: function start() {
	            var seed = arguments.length <= 0 || arguments[0] === undefined ? this.randomSeed() : arguments[0];

	            this.world.push(seed);
	        }
	    }, {
	        key: 'randomSeed',
	        value: function randomSeed() {
	            return new Uint8Array(this.boundaries.cellsLength).map(function (cell) {
	                return Math.random() >= 0.5 ? 1 : 0;
	            });
	        }
	    }, {
	        key: 'generateLine',
	        value: function generateLine() {
	            var _this = this;

	            var linePointer = this.pointer.line++;
	            var line = this.world[linePointer].map(function (cell, i) {
	                var right = _this.world[linePointer][i + 1] || 0;
	                var left = _this.world[linePointer][i - 1] || 0;
	                return _this.rule(cell, right, left);
	            });
	            this.executeInterceptors('line', line);
	            this.world.push(line);
	        }
	    }, {
	        key: 'registryInterceptor',
	        value: function registryInterceptor(event, fn) {
	            if (!this.interceptors[event]) {
	                this.interceptors[event] = [];
	            }

	            this.interceptors[event].push(fn);
	        }
	    }, {
	        key: 'executeInterceptors',
	        value: function executeInterceptors(event, value) {
	            this.interceptors[event].forEach(function (fn) {
	                return fn(value);
	            });
	        }
	    }]);

	    return Automata;
	}();

	exports.default = Automata;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CANVAS_SELECTOR = '#world';
	var CELL_HEIGHT = 10;
	var CELL_WIDTH = 10;

	var Render = function () {
	    function Render(lines) {
	        _classCallCheck(this, Render);

	        this.worldCanvas = document.querySelector(CANVAS_SELECTOR);
	        this.ctx = this.worldCanvas.getContext('2d');
	        this.linePointer = 0;
	        this.totalLines = lines;
	    }

	    _createClass(Render, [{
	        key: 'renderLine',
	        value: function renderLine(line) {
	            var _this = this;

	            if (this.linePointer > this.totalLines) {
	                this.shiftContext.call(this, this.worldCanvas.width, this.worldCanvas.height, 0, -CELL_WIDTH);
	                this.linePointer = this.totalLines - 1;
	            }

	            line.forEach(function (value, cell) {

	                _this.ctx.fillStyle = value ? '#000' : '#FFF';
	                _this.ctx.fillRect(cell * CELL_WIDTH, _this.linePointer * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
	            });
	            this.linePointer++;
	        }
	    }, {
	        key: 'shiftContext',
	        value: function shiftContext(w, h, dx, dy) {
	            var clamp = function clamp(high, value) {
	                return Math.max(0, Math.min(high, value));
	            };
	            var imageData = this.ctx.getImageData(clamp(w, -dx), clamp(h, -dy), clamp(w, w - dx), clamp(h, h - dy));

	            this.ctx.clearRect(0, 0, w, h);
	            this.ctx.putImageData(imageData, 0, 0);
	        }
	    }]);

	    return Render;
	}();

	exports.default = Render;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _minor = __webpack_require__(4);

	var _minor2 = _interopRequireDefault(_minor);

	var _chord = __webpack_require__(5);

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
	            currentProgression = index;
	        }

	        synth.set("volume", 0);
	        synth.triggerAttackRelease((0, _chord.triad)(_minor2.default[0], progression[currentProgression][offset / time % time]), time + 'n');
	    }
	};

	exports.default = playNote;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var scales = [["C3", "D3", "Eb3", "F3", "G3", "A3", "B3", "C4"], ["C5", "D5", "Eb5", "F5", "G5", "A5", "B5", "C6"]];

	exports.default = scales;

/***/ },
/* 5 */
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