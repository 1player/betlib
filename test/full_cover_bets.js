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

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('trixie', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.lose(),
      betlib.Selection.place('fractional', '1/1', '1/5'),
    ]);

    returns.numberOfBets().should.equal(448);
    returns.totalStake().should.equal(44800);
    returns.totalProfit().should.be.closeTo(-17282.07, 0.01);
    returns.totalReturn().should.be.closeTo(27517.93, 0.01);
  });
});

describe('yankee bet', () => {
  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('yankee', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.win('fractional', '1/1', '1/5'),
      betlib.Selection.lose(),
    ]);

    returns.totalStake().should.equal(2200);
    returns.numberOfBets().should.equal(22);
    returns.totalProfit().should.be.closeTo(150.20, 0.01);
    returns.totalReturn().should.be.closeTo(2350.20, 0.01);
  });
});

describe('patent bet', () => {
  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('patent', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.lose(),
      betlib.Selection.place('fractional', '1/1', '1/5'),
    ]);

    returns.numberOfBets().should.equal(784);
    returns.totalStake().should.equal(78400);
    returns.totalProfit().should.be.closeTo(-17912.07, 0.01);
    returns.totalReturn().should.be.closeTo(60487.93, 0.01);
  });
});

describe('lucky 15 bet', () => {
  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('lucky15', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.lose(),
      betlib.Selection.place('fractional', '1/1', '1/5'),
    ]);

    returns.numberOfBets().should.equal(2100);
    returns.totalStake().should.equal(210000);
    returns.totalProfit().should.be.closeTo(-74171.30, 0.01);
    returns.totalReturn().should.be.closeTo(135828.70, 0.01);
  });
});
