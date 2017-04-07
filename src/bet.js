import { Returns } from './returns.js';
import * as errors from './errors.js';

import foreachCombination from 'foreach-combination';

// Functional bet logic

function sequence(...fns) {
  return function (...args) {
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args);
    }
  };
}

// Enforce a certain number of selections
function minimumSelections(n) {
  return (allSelections, returns, isEachWay) => {
    if (allSelections.length < n) {
      throw new errors.InvalidSelectionCountError(`Expected at least ${n} selections`);
    }
  };
}

// Calculate a simple combination bet
function combinationBet(n) {
  return (allSelections, returns, isEachWay) => {
    foreachCombination(allSelections, n, (...selections) => {

      // Calculate win returns
      if (selections.every(selection => selection.outcome == 'win')) {
	returns.addBetReturn(selections.reduce(
	  (acc, selection) => acc * selection.decimalWinOdds(),
	  returns.unitStake));
      } else {
	returns.addBetReturn(0);
      }

      // Calculate place returns, if this is a each-way bet
      if (isEachWay) {
	if (selections.every(selection => selection.outcome != 'lose')) {
	  returns.addBetReturn(selections.reduce(
	    (acc, selection) => acc * selection.decimalPlaceOdds(),
	    returns.unitStake));
	} else {
	  returns.addBetReturn(0);
	}
      }
    });

  };
}

// Defer calculation to another bet `n` times
function defer(type, n = 1) {
  return (allSelections, returns, isEachWay) => {
    for (let i = 0; i < n; i++) {
      BET_TYPES[type](allSelections, returns, isEachWay);
    }
  };
}

// Bet types
const BET_TYPES = {
  // Simple bets
  single: combinationBet(1),
  double: sequence(minimumSelections(2), combinationBet(2)),
  treble: sequence(minimumSelections(3), combinationBet(3)),
  // accumulator is handled in the bet constructor

  // Full cover
  trixie: sequence(defer('double', 3), defer('treble')),
};

// Bet constructor
export class Bet {
  constructor(type, unitStake, isEachWay) {
    this.type = type;
    this.unitStake = unitStake;
    this.isEachWay = isEachWay;

    if (BET_TYPES.hasOwnProperty(type)) {
      this.betFn = BET_TYPES[type];
    } else if (type.slice(0, 11) === "accumulator") {
      // Handle custom accumulator bet.
      // I really hate this.
      var pieces = type.split(":", 2);
      let foldSize = pieces.length === 1 ? 4 : parseInt(pieces[1]);
      if (isNaN(foldSize) || foldSize < 4) {
	throw new Error("Invalid accumulator fold size.");
      }
      this.betFn = sequence(minimumSelections(foldSize), combinationBet(foldSize));
    } else {
      throw new Error("Unknown bet type " + type.toString());
    }
  }

  settle(selections) {
    let returns = new Returns(this.unitStake);
    this.betFn(selections, returns, this.isEachWay);
    return returns;
  }
}
