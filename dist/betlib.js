'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Returns = exports.SingleBet = exports.Selection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oddslib = require('oddslib');

var _oddslib2 = _interopRequireDefault(_oddslib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Bet = function () {
  function Bet(unitStake, isEachWay) {
    _classCallCheck(this, Bet);

    this.unitStake = unitStake;
    this.isEachWay = isEachWay;
  }

  _createClass(Bet, [{
    key: 'numberOfBets',
    value: function numberOfBets(selections) {
      throw new Error('Unimplemented.');
    }
  }, {
    key: 'calculateReturns',
    value: function calculateReturns(selections, returns) {
      throw new Error('Unimplemented.');
    }
  }, {
    key: 'settle',
    value: function settle(selections) {
      var returns = new Returns(this.unitStake);
      this.calculateReturns(selections, returns);
      return returns;
    }
  }]);

  return Bet;
}();

var SingleBet = exports.SingleBet = function (_Bet) {
  _inherits(SingleBet, _Bet);

  function SingleBet() {
    _classCallCheck(this, SingleBet);

    return _possibleConstructorReturn(this, (SingleBet.__proto__ || Object.getPrototypeOf(SingleBet)).apply(this, arguments));
  }

  _createClass(SingleBet, [{
    key: 'numberOfBets',
    value: function numberOfBets(selections) {
      return this.selections.length;
    }
  }, {
    key: 'calculateReturns',
    value: function calculateReturns(selections, returns) {
      var _this2 = this;

      // calculate win returns
      selections.forEach(function (selection) {
        if (selection.outcome == 'win') {
          returns.addBetReturn(_this2.unitStake * selection.decimalWinOdds());
        } else {
          returns.addBetReturn(0);
        }
      });

      // calculate place returns
      if (this.isEachWay) {
        selections.forEach(function (selection) {
          if (selection.outcome == 'win' || selection.outcome == 'place') {
            returns.addBetReturn(_this2.unitStake * selection.decimalPlaceOdds());
          } else {
            returns.addBetReturn(0);
          }
        });
      }
    }
  }]);

  return SingleBet;
}(Bet);

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
    key: 'addBetReturn',
    value: function addBetReturn(betReturn) {
      this.betReturns.push(betReturn);
    }
  }, {
    key: 'numberOfBets',
    value: function numberOfBets() {
      return this.betReturns.length;
    }
  }, {
    key: 'totalStake',
    value: function totalStake() {
      return this.unitStake * this.numberOfBets();
    }
  }, {
    key: 'totalProfit',
    value: function totalProfit() {
      return this.totalReturn() - this.totalStake();
    }
  }, {
    key: 'totalReturn',
    value: function totalReturn() {
      return sum(this.betReturns);
    }
  }]);

  return Returns;
}();