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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bet = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _returns = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Bet types
var BET_TYPES = {
  single: function single(selections, returns, isEachWay) {
    // calculate win returns
    selections.forEach(function (selection) {
      if (selection.outcome == 'win') {
        returns.addBetReturn(returns.unitStake * selection.decimalWinOdds());
      } else {
        returns.addBetReturn(0);
      }
    });

    // calculate place returns
    if (isEachWay) {
      selections.forEach(function (selection) {
        if (selection.outcome == 'win' || selection.outcome == 'place') {
          returns.addBetReturn(returns.unitStake * selection.decimalPlaceOdds());
        } else {
          returns.addBetReturn(0);
        }
      });
    }
  }
};

// Bet constructor

var Bet = exports.Bet = function () {
  function Bet(type, unitStake, isEachWay) {
    _classCallCheck(this, Bet);

    this.type = type;

    if (!BET_TYPES.hasOwnProperty(type)) {
      throw new Error("Unknown bet type " + type.toString());
    }

    this.unitStake = unitStake;
    this.isEachWay = isEachWay;
  }

  _createClass(Bet, [{
    key: 'settle',
    value: function settle(selections) {
      var returns = new _returns.Returns(this.unitStake);
      BET_TYPES[this.type](selections, returns, this.isEachWay);
      return returns;
    }
  }]);

  return Bet;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oddslib = __webpack_require__(4);

var _oddslib2 = _interopRequireDefault(_oddslib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Selection = exports.Selection = function () {
  function Selection(outcome, winOdds, placeOddsRatio) {
    _classCallCheck(this, Selection);

    this.outcome = outcome; // one of 'win', 'place', 'lose'

    if (this.outcome !== "lose") {
      this.winOdds = winOdds;

      var decimalWinOdds = this.winOdds.to('decimal');
      var decimalPlaceOddsRatio = placeOddsRatio.to('decimal');
      this.placeOdds = _oddslib2.default.from('decimal', 1 + (decimalWinOdds - 1) * (decimalPlaceOddsRatio - 1));
    }
  }

  // Static constructors


  _createClass(Selection, [{
    key: 'decimalWinOdds',
    value: function decimalWinOdds() {
      return this.winOdds.to('decimal');
    }
  }, {
    key: 'decimalPlaceOdds',
    value: function decimalPlaceOdds() {
      return this.placeOdds.to('decimal');
    }
  }], [{
    key: 'win',
    value: function win(oddsFormat, winOdds, placeOddsRatio) {
      return new Selection('win', _oddslib2.default.from(oddsFormat, winOdds), _oddslib2.default.from('fractional', placeOddsRatio));
    }
  }, {
    key: 'place',
    value: function place(oddsFormat, winOdds, placeOddsRatio) {
      return new Selection('place', _oddslib2.default.from(oddsFormat, winOdds), _oddslib2.default.from('fractional', placeOddsRatio));
    }
  }, {
    key: 'lose',
    value: function lose() {
      return new Selection('lose', null, null);
    }
  }]);

  return Selection;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// From http://www.mindspring.com/~alanh/fracs.html

// Approximate decimal number `d` into the returned fraction `frac`,
// so that |frac - d| < (10^-precision / 2).
// In other words, return an approximate fraction correct up to the
// `precision`th decimal place.
function approximateFraction(d, precision) {
  var numerators = [0, 1];
  var denominators = [1, 0];

  var maxNumerator = getMaxNumerator(d);
  var d2 = d;
  var calcD,
      prevCalcD = NaN;

  var acceptableError = Math.pow(10, -precision) / 2;

  for (var i = 2; i < 1000; i++) {
    var L2 = Math.floor(d2);
    numerators[i] = L2 * numerators[i - 1] + numerators[i - 2];
    if (Math.abs(numerators[i]) > maxNumerator) return;

    denominators[i] = L2 * denominators[i - 1] + denominators[i - 2];

    calcD = numerators[i] / denominators[i];

    if (Math.abs(calcD - d) < acceptableError || calcD == prevCalcD) {
      return numerators[i].toString() + "/" + denominators[i].toString();
    }

    d2 = 1 / (d2 - L2);
  }
}

function getMaxNumerator(f) {
  var f2 = null;
  var ixe = f.toString().indexOf("E");
  if (ixe == -1) ixe = f.toString().indexOf("e");
  if (ixe == -1) f2 = f.toString();else f2 = f.toString().substring(0, ixe);

  var digits = null;
  var ix = f2.toString().indexOf(".");
  if (ix == -1) digits = f2;else if (ix === 0) digits = f2.substring(1, f2.length);else if (ix < f2.length) digits = f2.substring(0, ix) + f2.substring(ix + 1, f2.length);

  var L = digits;

  var numDigits = L.toString().length;
  var L2 = f;
  var numIntDigits = L2.toString().length;
  if (L2 === 0) numIntDigits = 0;
  var numDigitsPastDecimal = numDigits - numIntDigits;

  var i;
  for (i = numDigitsPastDecimal; i > 0 && L % 2 === 0; i--) {
    L /= 2;
  }for (i = numDigitsPastDecimal; i > 0 && L % 5 === 0; i--) {
    L /= 5;
  }return L;
}

module.exports = approximateFraction;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var approximateFraction = __webpack_require__(3);

// Object.assign polyfill
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) {
    // .length of function is 2
    'use strict';

    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// 1.2 - 1.0 === 0.19999999999999996
// fixFloatError(1.2 - 1.0) === 0.2
var fixFloatError = function fixFloatError(n) {
  return parseFloat(n.toPrecision(12));
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

var FORMATS = {
  // European/Decimal format
  decimal: {
    from: function from(decimal) {
      decimal = parseFloat(decimal);
      if (decimal <= 1.0) {
        throw new Error("Outside valid range.");
      }
      return decimal;
    },
    to: function to() {
      return this.decimalValue;
    }
  },

  // American/Moneyline format
  moneyline: {
    from: function from(moneyline) {
      moneyline = parseFloat(moneyline);

      if (moneyline >= 0) {
        return moneyline / 100.0 + 1;
      }
      return 100 / -moneyline + 1;
    },
    to: function to() {
      if (this.decimalValue >= 2) {
        return fixFloatError((this.decimalValue - 1) * 100.0);
      }
      return fixFloatError(-100 / (this.decimalValue - 1));
    }
  },

  // Hong Kong format
  hongKong: {
    from: function from(hongKong) {
      hongKong = parseFloat(hongKong);
      if (hongKong < 0.0) {
        throw new Error("Outside valid range.");
      }
      return hongKong + 1.0;
    },
    to: function to() {
      return fixFloatError(this.decimalValue - 1);
    }
  },

  // Implied probability
  impliedProbability: {
    from: function from(ip) {
      // Handle percentage string
      if (typeof ip === "string" && ip.slice(-1) == "%") {
        ip = parseFloat(ip) / 100.0;
      } else {
        ip = parseFloat(ip);
      }

      if (ip <= 0.0 || ip >= 1.0) {
        throw new Error("Outside valid range");
      }

      return 1.0 / ip;
    },
    to: function to(options) {
      if (options.percentage) {
        var value = fixFloatError(100.0 / this.decimalValue);

        // HACK: Oddslib.prototype.to calls decimalAdjust if we return a number.
        // But we need to round before adding the % symbol.
        // So we do it here and return the string
        if (options.precision !== null) {
          value = decimalAdjust('round', value, -options.precision);
        }

        return value.toString() + "%";
      }

      return fixFloatError(1 / this.decimalValue);
    }
  },

  // UK/Fractional format
  fractional: {
    from: function from(n) {
      // Try to split on the slash
      var pieces = n.toString().split("/");

      n = parseFloat(pieces[0]);

      var d;
      if (pieces.length === 2) {
        d = parseFloat(pieces[1]);
      } else if (pieces.length === 1) {
        d = 1;
      } else {
        throw new Error('Invalid fraction');
      }

      if (n === 0 || d === 0 || n / d <= 0.0) {
        throw new Error('Outside valid range');
      }

      return 1 + n / d;
    },
    to: function to(options) {
      return approximateFraction(this.decimalValue - 1, options.precision || 12);
    }
  },

  // Malay format
  malay: {
    from: function from(malay) {
      malay = parseFloat(malay);

      if (malay <= -1.0 || malay > 1.0) {
        throw new Error("Outside valid range.");
      }

      if (malay < 0) {
        malay = -1 / malay;
      }
      return malay + 1;
    },
    to: function to() {
      if (this.decimalValue <= 2.0) {
        return fixFloatError(this.decimalValue - 1);
      }
      return fixFloatError(-1 / (this.decimalValue - 1));
    }
  },

  // Indonesian format
  indonesian: {
    from: function from(indonesian) {
      indonesian = parseFloat(indonesian);

      if (indonesian === 0) {
        throw new Error("Outside valid range.");
      }

      if (indonesian >= 1) {
        return indonesian + 1;
      }
      return -1 / indonesian + 1;
    },
    to: function to() {
      if (this.decimalValue < 2.0) {
        return fixFloatError(-1 / (this.decimalValue - 1));
      }
      return fixFloatError(this.decimalValue - 1);
    }
  }
};

var Odds = function () {
  // Private constructor pattern
  // from http://stackoverflow.com/a/21731713
  var PublicOdds = function PublicOdds() {
    throw new Error('This constructor is private, please use the from* functions');
  };
  var Odds = function Odds(decimalValue) {
    if (typeof decimalValue !== "number" || isNaN(decimalValue)) {
      throw new Error("Invalid odds");
    }

    this.decimalValue = fixFloatError(decimalValue);
  };
  Odds.prototype = PublicOdds.prototype;

  // Generic constructor
  PublicOdds.from = function (format, value) {
    if (!FORMATS.hasOwnProperty(format)) {
      throw new Error("Unknown format " + format + ".");
    }
    var decimal = FORMATS[format].from(value);
    return new Odds(decimal);
  };

  return PublicOdds;
}();

// Conversion API
Odds.prototype.to = function (format, options) {
  if (!FORMATS.hasOwnProperty(format)) {
    throw new Error("Unknown format " + format + ".");
  }

  options = Object.assign({
    precision: null,
    percentage: false
  }, options);

  var ret = FORMATS[format].to.call(this, options);
  if (typeof ret === "number" && options.precision !== null) {
    ret = decimalAdjust('round', ret, -options.precision);
  }
  return ret;
};

module.exports = {
  Odds: Odds,

  from: Odds.from
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _returns = __webpack_require__(0);

Object.defineProperty(exports, 'Returns', {
  enumerable: true,
  get: function get() {
    return _returns.Returns;
  }
});

var _selection = __webpack_require__(2);

Object.defineProperty(exports, 'Selection', {
  enumerable: true,
  get: function get() {
    return _selection.Selection;
  }
});

var _bet = __webpack_require__(1);

Object.defineProperty(exports, 'Bet', {
  enumerable: true,
  get: function get() {
    return _bet.Bet;
  }
});

/***/ })
/******/ ]);
});