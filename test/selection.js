var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('win selection', () => {
  it('calculates returns correctly', () => {
    let selection = new betlib.WinSelection({winOdds: 5.5, placeOddsFraction: '1/4'});
    selection.appliesToWinMarket().should.equal(true);
    selection.appliesToPlaceMarket().should.equal(true);
    selection.winMarketReturns().should.equal(5.5);
    selection.placeMarketReturns().should.be.closeTo(2.125, 0.001);
  });

  it('handles rule4', () => {
    let selection = new betlib.WinSelection({winOdds: 5.5, placeOddsFraction: '1/4', rule4: .35});
    selection.winMarketReturns().should.be.closeTo(3.92, 0.01);
  })
});

describe('place selection', () => {
  it('calculates returns correctly', () => {
    let selection = new betlib.PlaceSelection({winOdds: 5.5, placeOddsFraction: '1/4'});
    selection.appliesToWinMarket().should.equal(false);
    selection.appliesToPlaceMarket().should.equal(true);
    selection.placeMarketReturns().should.be.closeTo(2.125, 0.001);
  });

  it('handles rule4', () => {
    let selection = new betlib.PlaceSelection({winOdds: 5.5, placeOddsFraction: '1/4', rule4: .35});
    selection.placeMarketReturns().should.be.closeTo(1.73, 0.01);
  })
})

describe('lose selection', () => {
  it('calculates returns correctly', () => {
    let selection = new betlib.LoseSelection();
    selection.appliesToWinMarket().should.equal(false);
    selection.appliesToPlaceMarket().should.equal(false);
  });
});

describe('void selection', () => {
  it('calculates returns correctly', () => {
    let selection = new betlib.VoidSelection();
    selection.appliesToWinMarket().should.equal(true);
    selection.appliesToPlaceMarket().should.equal(true);
    selection.winMarketReturns().should.equal(1);
    selection.placeMarketReturns().should.equal(1);
  });
})

describe('dead heat selection', () => {
  it('calculates tie place returns correctly', () => {
      let selection = new betlib.DeadHeatSelection({
        winOdds: 9, placeOddsFraction: '1/4',
        tiedPosition: 2, placesOffered: 5, runnersInDeadHeat: 4,
      });
      selection.appliesToWinMarket().should.equal(false);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.placeMarketReturns().should.equal(3);

      selection = new betlib.DeadHeatSelection({
        winOdds: 9, placeOddsFraction: '1/4',
        tiedPosition: 3, placesOffered: 4, runnersInDeadHeat: 3,
      });
      selection.appliesToWinMarket().should.equal(false);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.placeMarketReturns().should.equal(2);

      selection = new betlib.DeadHeatSelection({
        winOdds: 9, placeOddsFraction: '1/4',
        tiedPosition: 2, placesOffered: 5, runnersInDeadHeat: 3,
      });
      selection.appliesToWinMarket().should.equal(false);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.placeMarketReturns().should.equal(3);

      selection = new betlib.DeadHeatSelection({
        winOdds: 9, placeOddsFraction: '1/4',
        tiedPosition: 3, placesOffered: 5, runnersInDeadHeat: 8,
      });
      selection.appliesToWinMarket().should.equal(false);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.placeMarketReturns().should.be.closeTo(1.13, 0.01);
  })

  it('calculates tie win returns correctly', () => {
      let selection = new betlib.DeadHeatSelection({
        winOdds: 9, placeOddsFraction: '1/4',
        tiedPosition: 1, placesOffered: 3, runnersInDeadHeat: 4,
      });
      selection.appliesToWinMarket().should.equal(true);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.winMarketReturns().should.equal(2.25);
      selection.placeMarketReturns().should.equal(2.25);
  })

  it('handles rule 4', () => {
      let selection = new betlib.DeadHeatSelection({
        winOdds: 5.5, placeOddsFraction: '1/4',
        tiedPosition: 1, placesOffered: 3, runnersInDeadHeat: 4,
        rule4: .35,
      });
      selection.appliesToWinMarket().should.equal(true);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.winMarketReturns().should.be.closeTo(0.98, 0.01);
      selection.placeMarketReturns().should.be.closeTo(1.30, 0.01);

      selection = new betlib.DeadHeatSelection({
        winOdds: 5.5, placeOddsFraction: '1/4',
        tiedPosition: 2, placesOffered: 3, runnersInDeadHeat: 4,
        rule4: .35,
      });
      selection.appliesToWinMarket().should.equal(false);
      selection.appliesToPlaceMarket().should.equal(true);
      selection.placeMarketReturns().should.be.closeTo(0.87, 0.01);
  })
})