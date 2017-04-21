function parseFraction(v) {
  let [num, denom] = v.split('/');
  return parseInt(num) / parseInt(denom);
}

export class Selection {
  constructor(outcome, winOdds, {
    placeOddsRatio = '1/1', 
    rule4 = 0, 
    placesOffered = null, 
    tiedPosition = null,
    runnersInDeadHeat = null,
  } = {}) {
    this.outcome = outcome; // one of 'win', 'place', 'lose', 'void'

    switch (this.outcome) {
      case 'deadheat':
        this.placesOffered = placesOffered;
        this.tiedPosition = tiedPosition;
        this.runnersInDeadHeat = runnersInDeadHeat;
        // fallthrough
      case 'win':
      case 'place':
        this.winOdds = winOdds;
        this.rule4 = rule4;

        if (this.winOdds == null) {
          throw new Error("Winning odds are required.");
        }

        if (this.rule4 < 0 || this.rule4 > 0.90) {
          throw new Error("Expected Rule 4 deduction to be in range 0 <= x <= 0.9")
        }

        const decimalPlaceOddsRatio = parseFraction(placeOddsRatio);
        this.placeOdds = 1 + (this.winOdds - 1) * decimalPlaceOddsRatio;
        break;


      case 'void':
        this.winOdds = 1;
        this.placeOdds = 1;
        this.rule4 = 0;
        break;

      case 'lose':
        break;

      default:
        throw new Error(`Unknown selection outcome ${outcome}`);
    }
  }

  validInWinMarket() {
    return this.outcome === 'win' || this.outcome === 'void' || (this.outcome === 'deadheat' && this.tiedPosition == 1);
  }

  validInPlaceMarket() {
    return this.outcome !== 'lose';
  }

  // Returns on the win market with a stake of 1
  winMarketReturns() {
    if (this.outcome === 'lose') {
      throw new Error("BUG: calculating returns on a lost selection");
    }

    let returns = ((this.winOdds - 1) * (1 - this.rule4)) + 1;

    if (this.outcome === 'deadheat') {
      returns /= this.runnersInDeadHeat;
    }

    return returns;
  }

  // Returns on the place market with a stake of 1
  placeMarketReturns() {
    if (this.outcome === 'lose') {
      throw new Error("BUG: calculating returns on a lost selection");
    }

    let returns = ((this.placeOdds - 1) * (1 - this.rule4)) + 1;

    if (this.outcome === 'deadheat') {
      let sharedPayingPlaces = this.placesOffered - this.tiedPosition + 1;
      if (sharedPayingPlaces < this.runnersInDeadHeat) {
        returns *= sharedPayingPlaces / this.runnersInDeadHeat;
      }
    }

    return returns;
  }
}
