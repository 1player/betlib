import { Returns } from './returns.js';

// Bet types
const BET_TYPES = {
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
  }
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
