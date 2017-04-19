function parseFraction(v) {
  let [num, denom] = v.split('/');
  return parseInt(num) / parseInt(denom);
}

export class Selection {
  constructor(outcome, winOdds, {placeOddsRatio = '1/1', rule4 = 0} = {}) {
    this.outcome = outcome; // one of 'win', 'place', 'lose', 'void'

    switch (this.outcome) {
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
}
