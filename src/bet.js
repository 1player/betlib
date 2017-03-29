import { Returns } from './returns.js';
import * as errors from './errors.js';

import foreachCombination from 'foreach-combination';

// Bet types
const BET_TYPES = {
  // Single bet
  single: (selections, returns, isEachWay) => {
    // calculate win returns
    selections.forEach(selection => {
      if (selection.outcome == 'win') {
	returns.addBetReturn(returns.unitStake * selection.decimalWinOdds());
      } else {
	returns.addBetReturn(0);
      }
    });

    // calculate place returns
    if (isEachWay) {
      selections.forEach(selection => {
	if (selection.outcome == 'win' ||
	    selection.outcome == 'place') {
	  returns.addBetReturn(returns.unitStake * selection.decimalPlaceOdds());
	} else {
	  returns.addBetReturn(0);
	}
      });
    }
  },

  // Double bet
  double: (selections, returns, isEachWay) => {
    if (selections.length < 2) {
      throw new errors.InvalidSelectionCountError("Minimum 2 selections required");
    }

    foreachCombination(selections, 2, (a, b) => {
      if (a.outcome == 'win' && b.outcome == 'win') {
	returns.addBetReturn(returns.unitStake * a.decimalWinOdds() * b.decimalWinOdds());
      } else {
	returns.addBetReturn(0);
      }

      if (isEachWay) {
	if (a.outcome != 'lose' && b.outcome != 'lose') {
	  returns.addBetReturn(returns.unitStake * a.decimalPlaceOdds() * b.decimalPlaceOdds());
	} else {
	  returns.addBetReturn(0);
	}
      }
    });
  },

};

// Bet constructor
export class Bet {
  constructor(type, unitStake, isEachWay) {
    this.type = type;

    if (!BET_TYPES.hasOwnProperty(type)) {
      throw new Error("Unknown bet type " + type.toString());
    }

    this.unitStake = unitStake;
    this.isEachWay = isEachWay;
  }

  settle(selections) {
    let returns = new Returns(this.unitStake);
    BET_TYPES[this.type](selections, returns, this.isEachWay);
    return returns;
  }
}
