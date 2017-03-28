import oddslib from 'oddslib';

export class Selection {
  constructor(outcome, winOdds, placeOddsRatio) {
    this.outcome = outcome; // one of 'win', 'place', 'lose'

    if (this.outcome !== "lose") {
      this.winOdds = winOdds;

      const decimalWinOdds = this.winOdds.to('decimal');
      const decimalPlaceOddsRatio = placeOddsRatio.to('decimal');
      this.placeOdds = oddslib.from('decimal', 1 + (decimalWinOdds - 1) * (decimalPlaceOddsRatio - 1));
    }
  }

  // Static constructors
  static win(oddsFormat, winOdds, placeOddsRatio) {
    return new Selection('win', oddslib.from(oddsFormat, winOdds), oddslib.from('fractional', placeOddsRatio));
  }

  static place(oddsFormat, winOdds, placeOddsRatio) {
    return new Selection('place', oddslib.from(oddsFormat, winOdds), oddslib.from('fractional', placeOddsRatio));
  }

  static lose() {
    return new Selection('lose', null, null);
  }


  decimalWinOdds() {
    return this.winOdds.to('decimal');
  }

  decimalPlaceOdds() {
    return this.placeOdds.to('decimal');
  }
}

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

function sum(list) {
  return list.reduce((acc, item) => {
    return acc + item;
  }, 0);
}

export class Returns {
  constructor(unitStake) {
    this.unitStake = unitStake;
    this.betReturns = [];
  }

  addBetReturn(betReturn) {
    this.betReturns.push(betReturn);
  }

  numberOfBets() {
    return this.betReturns.length;
  }

  totalStake() {
    return this.unitStake * this.numberOfBets();
  }

  totalProfit() {
    return this.totalReturn() - this.totalStake();
  }

  totalReturn() {
    return sum(this.betReturns);
  }
}
