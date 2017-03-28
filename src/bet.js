import { Returns } from './returns.js';

class Bet {
  constructor(unitStake, isEachWay) {
    this.unitStake = unitStake;
    this.isEachWay = isEachWay;
  }

  numberOfBets(selections) {
    throw new Error('Unimplemented.');
  }

  calculateReturns(selections, returns) {
    throw new Error('Unimplemented.');
  }

  settle(selections) {
    let returns = new Returns(this.unitStake);
    this.calculateReturns(selections, returns);
    return returns;
  }
}

export class SingleBet extends Bet {
  numberOfBets(selections) {
    return this.selections.length;
  }

  calculateReturns(selections, returns) {
    // calculate win returns
    selections.forEach(selection => {
      if (selection.outcome == 'win') {
	returns.addBetReturn(this.unitStake * selection.decimalWinOdds());
      } else {
	returns.addBetReturn(0);
      }
    });

    // calculate place returns
    if (this.isEachWay) {
      selections.forEach(selection => {
	if (selection.outcome == 'win' ||
	    selection.outcome == 'place') {
	  returns.addBetReturn(this.unitStake * selection.decimalPlaceOdds());
	} else {
	  returns.addBetReturn(0);
	}
      });
    }
  }
}
