function parseFraction(v) {
  let [num, denom] = v.split('/');
  return parseInt(num) / parseInt(denom);
}

export class Selection {
  constructor(outcome, winOdds, {placeOddsRatio = '1/1', rule4 = 0} = {}) {
    this.outcome = outcome; // one of 'win', 'place', 'lose'
    this.winOdds = winOdds;
    this.placeOdds = null;
    this.rule4 = rule4;

    if (this.outcome !== "lose") {
      if (this.winOdds == null) {
        throw new Error("Winning odds are required.");
      }

      const decimalPlaceOddsRatio = parseFraction(placeOddsRatio);
      this.placeOdds = 1 + (this.winOdds - 1) * decimalPlaceOddsRatio;
    }
  }
}
