var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('selection', () => {
  it('sets odds correctly', () => {
    let selection = new betlib.Selection('win', 5.5, {
      placeOddsRatio: '1/5',
    });

    selection.winOdds.should.equal(5.5);
    selection.placeOdds.should.equal(1.9);
  });

  it('sets place odds to 1/1 when undefined', () => {
    let winSelection = new betlib.Selection('win', 5.5);
    let placeSelection = new betlib.Selection('place', 5.5);

    let expected = new betlib.Selection('win', 5.5, {
      placeOddsRatio: '1/1',
    });

    winSelection.winOdds.should.equal(expected.winOdds);
    winSelection.placeOdds.should.equal(expected.placeOdds);

    placeSelection.winOdds.should.equal(expected.winOdds);
    placeSelection.placeOdds.should.equal(expected.placeOdds);
  });
});
