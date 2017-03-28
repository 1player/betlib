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
