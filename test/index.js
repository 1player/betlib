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

describe('returns', () => {
  it('works with a single bet', () => {
    let returns = new betlib.Returns(100);
    returns.addBetReturn(450);

    returns.totalStake().should.equal(100);
    returns.numberOfBets().should.equal(1);
    returns.totalProfit().should.equal(350);
    returns.totalReturn().should.equal(450);
  });

  it('works with multiple bets', () => {
    let returns = new betlib.Returns(100);
    returns.addBetReturn(550);
    returns.addBetReturn(0);
    returns.addBetReturn(0);

    returns.totalStake().should.equal(300);
    returns.numberOfBets().should.equal(3);
    returns.totalProfit().should.equal(250);
    returns.totalReturn().should.equal(550);
  });
});

describe('selection', () => {
  it('sets odds correctly', () => {
    let selection = betlib.Selection.win('fractional', '9/2', '1/5');

    selection.decimalWinOdds().should.equal(5.5);
    selection.winOdds.to('indonesian').should.equal(4.5);

    selection.decimalPlaceOdds().should.equal(1.9);
  });
});
