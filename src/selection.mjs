class Selection {
  constructor() {}

  appliesToWinMarket() {
    throw new Error('BUG: unimplemented');
  }
  appliesToPlaceMarket() {
    throw new Error('BUG: unimplemented');
  }
  winMarketReturns() {
    throw new Error('BUG: unimplemented');
  }
  placeMarketReturns() {
    throw new Error('BUG: unimplemented');
  }

  // Returns on a stake of 1
  unitReturns(odds) {
    return ((odds - 1) * (1 - this.rule4)) + 1;
  }
}

export class WinSelection extends Selection {
  constructor({winOdds, placeOddsFraction = '1/1', rule4 = 0}) {
    super();

    this.winOdds = winOdds;
    this.rule4 = rule4;

    let [num, denom] = placeOddsFraction.split('/');
    const decimalPlaceOddsFraction = parseInt(num) / parseInt(denom);
    this.placeOdds = 1 + (this.winOdds - 1) * decimalPlaceOddsFraction;

    if (this.rule4 < 0 || this.rule4 > 0.90) {
      throw new Error("Expected Rule 4 deduction to be in range 0 <= x <= 0.9")
    }
  }

  appliesToWinMarket() { return true; }
  appliesToPlaceMarket() { return true; }

  winMarketReturns() {
    return this.unitReturns(this.winOdds);
  }
  placeMarketReturns() {
    return this.unitReturns(this.placeOdds);
  }
}

export class PlaceSelection extends WinSelection {
  appliesToWinMarket() { return false; }
  appliesToPlaceMarket() { return true; }

  winMarketReturns() {
    throw new Error('BUG: place selection does not apply to win markets');
  }
  placeMarketReturns() {
    return this.unitReturns(this.placeOdds);
  }
}

export class LoseSelection extends Selection {
  appliesToWinMarket() { return false; }
  appliesToPlaceMarket() { return false; }
  winMarketReturns() { throw new Error('BUG: lose selection does not apply to any market'); }
  placeMarketReturns() { throw new Error('BUG: lose selection does not apply to any market'); }
}

export class VoidSelection extends Selection {
  appliesToWinMarket() { return true; }
  appliesToPlaceMarket() { return true; }

  winMarketReturns() { return 1; }
  placeMarketReturns() { return 1; }
}

export class DeadHeatSelection extends WinSelection {
  constructor({tiedPosition, placesOffered, runnersInDeadHeat, winOdds, placeOddsFraction = '1/1', rule4 = 0}) {
    super({winOdds, placeOddsFraction, rule4});
    this.tiedPosition = tiedPosition;
    this.placesOffered = placesOffered;
    this.runnersInDeadHeat = runnersInDeadHeat;
  }
  appliesToWinMarket() { return this.tiedPosition === 1; }
  appliesToPlaceMarket() { return true; }

  winMarketReturns() { 
    return this.unitReturns(this.winOdds) / this.runnersInDeadHeat;
  }
  placeMarketReturns() { 
    let returns = this.unitReturns(this.placeOdds);
    let sharedPayingPlaces = this.placesOffered - this.tiedPosition + 1;
    if (sharedPayingPlaces < this.runnersInDeadHeat) {
      returns *= sharedPayingPlaces / this.runnersInDeadHeat;
    }

    return returns;
  }
}