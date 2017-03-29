var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('single bet', () => {
  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('single', 100, false);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
    ]);

    returns.totalStake().should.equal(300);
    returns.numberOfBets().should.equal(3);
    returns.totalProfit().should.equal(250);
    returns.totalReturn().should.equal(550);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('single', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
    ]);

    returns.totalStake().should.equal(600);
    returns.numberOfBets().should.equal(6);
    returns.totalProfit().should.equal(330);
    returns.totalReturn().should.equal(930);
  });
});

describe('double bet', () => {
  it('does not work with less than 2 selections', () => {
    const bet = new betlib.Bet('double', 100, false);
    expect(() => {
      bet.settle([
	betlib.Selection.win('fractional', '9/2', '1/5'),
      ]);
    }).to.throw(betlib.InvalidSelectionCountError);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('double', 100, false);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '7/4', '1/5'),
    ]);

    returns.totalStake().should.equal(300);
    returns.numberOfBets().should.equal(3);
    returns.totalProfit().should.equal(1212.50);
    returns.totalReturn().should.equal(1512.50);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('double', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
    ]);

    returns.totalStake().should.equal(600);
    returns.numberOfBets().should.equal(6);
    returns.totalProfit().should.equal(-239);
    returns.totalReturn().should.equal(361);
  });
});

describe('treble bet', () => {
  it('does not work with less than 3 selections', () => {
    const bet = new betlib.Bet('treble', 100, false);
    expect(() => {
      bet.settle([
	betlib.Selection.win('fractional', '9/2', '1/5'),
	betlib.Selection.win('fractional', '9/2', '1/5'),
      ]);
    }).to.throw(betlib.InvalidSelectionCountError);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('treble', 100, false);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
    ]);

    returns.totalStake().should.equal(1000);
    returns.numberOfBets().should.equal(10);
    returns.totalProfit().should.be.closeTo(222.22, 0.5);
    returns.totalReturn().should.be.closeTo(1222.22, 0.5);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('treble', 100, true);
    const returns = bet.settle([
      betlib.Selection.win('fractional', '9/2', '1/5'),
      betlib.Selection.place('fractional', '9/2', '1/5'),
      betlib.Selection.lose(),
      betlib.Selection.win('fractional', '2/3', '1/5'),
      betlib.Selection.win('fractional', '1/3', '1/5'),
    ]);

    returns.totalStake().should.equal(2000);
    returns.numberOfBets().should.equal(20);
    returns.totalProfit().should.be.closeTo(475.80, 0.5);
    returns.totalReturn().should.be.closeTo(2475.80, 0.5);
  });
});
