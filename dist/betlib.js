(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["betlib"] = factory();
	else
		root["betlib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// http://stackoverflow.com/a/35858868
var makeError = function makeError(name) {
  var cls = function cls(message) {
    _classCallCheck(this, cls);

    this.name = name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  };
  cls.prototype = Object.create(Error.prototype);
  return cls;
};

var InvalidSelectionCountError = exports.InvalidSelectionCountError = makeError('InvalidSelectionCountError');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sum(list) {
  return list.reduce(function (acc, item) {
    return acc + item;
  }, 0);
}

var Returns = exports.Returns = function () {
  function Returns(unitStake) {
    _classCallCheck(this, Returns);

    this.unitStake = unitStake;
    this.betReturns = [];
  }

  _createClass(Returns, [{
    key: "addBetReturn",
    value: function addBetReturn(betReturn) {
      this.betReturns.push(betReturn);
    }
  }, {
    key: "numberOfBets",
    value: function numberOfBets() {
      return this.betReturns.length;
    }
  }, {
    key: "totalStake",
    value: function totalStake() {
      return this.unitStake * this.numberOfBets();
    }
  }, {
    key: "totalProfit",
    value: function totalProfit() {
      return this.totalReturn() - this.totalStake();
    }
  }, {
    key: "totalReturn",
    value: function totalReturn() {
      return sum(this.betReturns);
    }
  }]);

  return Returns;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _returns = __webpack_require__(1);

var _errors = __webpack_require__(0);

var errors = _interopRequireWildcard(_errors);

var _foreachCombination = __webpack_require__(4);

var _foreachCombination2 = _interopRequireDefault(_foreachCombination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Calculate a simple combination bet
function combinationBet(n) {
  return function (allSelections, returns, isEachWay) {
    if (allSelections.length < n) {
      throw new errors.InvalidSelectionCountError('Expected at least ' + n + ' selections');
    }

    (0, _foreachCombination2.default)(allSelections, n, function () {
      for (var _len = arguments.length, selections = Array(_len), _key = 0; _key < _len; _key++) {
        selections[_key] = arguments[_key];
      }

      // Calculate win returns
      if (selections.every(function (selection) {
        return selection.outcome == 'win';
      })) {
        returns.addBetReturn(selections.reduce(function (acc, selection) {
          return acc * (selection.winOdds + selection.rule4 - selection.winOdds * selection.rule4);
        }, returns.unitStake));
      } else {
        returns.addBetReturn(0);
      }
      // Calculate place returns, if this is a each-way bet
      if (isEachWay) {
        if (selections.every(function (selection) {
          return selection.outcome != 'lose';
        })) {
          returns.addBetReturn(selections.reduce(function (acc, selection) {
            return acc * (selection.placeOdds + selection.rule4 - selection.placeOdds * selection.rule4);
          }, returns.unitStake));
        } else {
          returns.addBetReturn(0);
        }
      }
    });
  };
}

// Calculate full cover bet
function cover(n) {
  var withSingles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function (allSelections, returns, isEachWay) {
    if (allSelections.length < n) {
      throw new errors.InvalidSelectionCountError('Expected at least ' + n + ' selections');
    }

    (0, _foreachCombination2.default)(allSelections, n, function () {
      for (var _len2 = arguments.length, selections = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        selections[_key2] = arguments[_key2];
      }

      for (var i = withSingles ? 1 : 2; i <= n; i++) {
        combinationBet(i)(selections, returns, isEachWay);
      }
    });
  };
}

// Bet types
var BET_TYPES = {
  // Simple bets
  single: combinationBet(1),
  double: combinationBet(2),
  treble: combinationBet(3),
  // accumulator is handled in `Bet` constructor

  // Full cover
  trixie: cover(3),
  yankee: cover(4),
  canadian: cover(5),
  heinz: cover(6),
  superHeinz: cover(7),
  goliath: cover(8),

  // Full cover with singles
  patent: cover(3, true),
  lucky15: cover(4, true),
  lucky31: cover(5, true),
  lucky63: cover(6, true),
  // yap is a lucky 15 without any bonus applied, which we do not support anyway
  yap: cover(4, true)
};

// Bet constructor

var Bet = exports.Bet = function () {
  function Bet(type, unitStake, isEachWay) {
    _classCallCheck(this, Bet);

    this.type = type;
    this.unitStake = unitStake;
    this.isEachWay = isEachWay;

    if (BET_TYPES.hasOwnProperty(type)) {
      this.betFn = BET_TYPES[type];
    }
    // Handle custom accumulator bet.
    else if (type.slice(0, 11) === "accumulator") {
        var pieces = type.split(":", 2);
        var foldSize = pieces.length === 1 ? 4 : parseInt(pieces[1]);
        if (isNaN(foldSize) || foldSize < 4) {
          throw new Error("Invalid accumulator fold size.");
        }
        this.betFn = combinationBet(foldSize);
      } else {
        throw new Error("Unknown bet type " + type.toString());
      }
  }

  _createClass(Bet, [{
    key: 'settle',
    value: function settle(selections) {
      var returns = new _returns.Returns(this.unitStake);
      this.betFn(selections, returns, this.isEachWay);
      return returns;
    }
  }]);

  return Bet;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parseFraction(v) {
  var _v$split = v.split('/'),
      _v$split2 = _slicedToArray(_v$split, 2),
      num = _v$split2[0],
      denom = _v$split2[1];

  return parseInt(num) / parseInt(denom);
}

var Selection = exports.Selection = function Selection(outcome, winOdds) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$placeOddsRatio = _ref.placeOddsRatio,
      placeOddsRatio = _ref$placeOddsRatio === undefined ? '1/1' : _ref$placeOddsRatio,
      _ref$rule = _ref.rule4,
      rule4 = _ref$rule === undefined ? 0 : _ref$rule;

  _classCallCheck(this, Selection);

  this.outcome = outcome; // one of 'win', 'place', 'lose'
  this.winOdds = winOdds;
  this.placeOdds = null;
  this.rule4 = rule4;

  if (this.rule4 < 0 || this.rule4 > 0.90) {
    throw new Error("Expected Rule 4 deduction to be in range 0 <= x <= 0.9");
  }

  if (this.outcome !== "lose") {
    if (this.winOdds == null) {
      throw new Error("Winning odds are required.");
    }

    var decimalPlaceOddsRatio = parseFraction(placeOddsRatio);
    this.placeOdds = 1 + (this.winOdds - 1) * decimalPlaceOddsRatio;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NUM_EXPAND = 32;

function generateForeach(k) {
  var funcName = "foreach" + k + "Comb";
  var code = ["function ", funcName, "(x,f){var n=x.length|0"];
  for (var i = 0; i < k; ++i) {
    code.push(",i", i);
  }
  code.push(",r;");
  for (var i = 0; i < k; ++i) {
    code.push("for(i", i, "=", i === 0 ? "0" : "1+i" + (i - 1), ";i", i, "<n;++i", i, "){");
  }
  code.push("r=f(");
  for (var i = 0; i < k; ++i) {
    if (i > 0) {
      code.push(",");
    }
    code.push("x[i", i, "]");
  }
  code.push(");if(r!==void 0)return r;");
  for (var i = 0; i < k; ++i) {
    code.push("}");
  }
  code.push("};return ", funcName);
  var proc = new Function(code.join(""));
  return proc();
}

function noop() {}

var CACHE = {};
function bigCombination(x, k, f) {
  if (k < 0) {
    return;
  }
  var proc = CACHE[k];
  if (!proc) {
    CACHE[k] = proc = generateForeach(k);
  }
  return proc(x, f);
}

function createExports() {
  var list = [noop];
  for (var i = 1; i < NUM_EXPAND; ++i) {
    list.push(generateForeach(i));
  }
  list.push(bigCombination);
  var funcName = "dispatchCombination";
  var code = ["function ", funcName, "(x,k,f){switch(k){"];
  var args = [];
  for (var i = 0; i < NUM_EXPAND; ++i) {
    code.push("case ", i, ":return c", i, "(x,f);");
    args.push("c" + i);
  }
  code.push("default:return b(x,f)}}return ", funcName);
  args.push("b");
  args.push(code.join(""));
  var proc = Function.apply(void 0, args);
  module.exports = proc.apply(void 0, list);
  for (var i = 0; i < NUM_EXPAND; ++i) {
    module.exports[i] = list[i];
  }
}

createExports();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _returns = __webpack_require__(1);

Object.defineProperty(exports, 'Returns', {
  enumerable: true,
  get: function get() {
    return _returns.Returns;
  }
});

var _selection = __webpack_require__(3);

Object.defineProperty(exports, 'Selection', {
  enumerable: true,
  get: function get() {
    return _selection.Selection;
  }
});

var _bet = __webpack_require__(2);

Object.defineProperty(exports, 'Bet', {
  enumerable: true,
  get: function get() {
    return _bet.Bet;
  }
});

var _errors = __webpack_require__(0);

Object.defineProperty(exports, 'InvalidSelectionCountError', {
  enumerable: true,
  get: function get() {
    return _errors.InvalidSelectionCountError;
  }
});

/***/ })
/******/ ]);
});