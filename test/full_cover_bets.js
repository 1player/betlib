var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('trixie bet', () => {
  it('does not work with less than 3 selections', () => {
    const bet = new betlib.Bet('trixie', 100, false);
    expect(() => {
      bet.settle([
	betlib.Selection.win('fractional', '9/2', '1/5'),
	betlib.Selection.win('fractional', '9/2', '1/5'),
      ]);
    }).to.throw(betlib.InvalidSelectionCountError);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('trixie', 100, false);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
    ]);

    returns.totalStake().should.equal(4000);
    returns.numberOfBets().should.equal(40);
    returns.totalProfit().should.be.closeTo(2838.89, 0.01);
    returns.totalReturn().should.be.closeTo(6838.89, 0.01);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('trixie', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
    ]);

    returns.totalStake().should.equal(8000);
    returns.numberOfBets().should.equal(80);
    returns.totalProfit().should.be.closeTo(4046.13, 0.01);
    returns.totalReturn().should.be.closeTo(12046.13, 0.01);
  });
});
