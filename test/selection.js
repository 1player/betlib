var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('selection', () => {
  it('sets odds correctly', () => {
    let selection = betlib.Selection.win('fractional', '9/2', '1/5');

    selection.decimalWinOdds().should.equal(5.5);
    selection.winOdds.to('indonesian').should.equal(4.5);

    selection.decimalPlaceOdds().should.equal(1.9);
  });
});
