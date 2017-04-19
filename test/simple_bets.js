var should = require('chai').should(),
    expect = require('chai').expect;

var betlib = require('../dist/betlib');

describe('single bet', () => {
  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('single', 100, false);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
    ]);

    returns.totalStake().should.equal(300);
    returns.numberOfBets().should.equal(3);
    returns.totalProfit().should.equal(250);
    returns.totalReturn().should.equal(550);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('single', 100, true);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
    ]);

    returns.totalStake().should.equal(600);
    returns.numberOfBets().should.equal(6);
    returns.totalProfit().should.equal(330);
    returns.totalReturn().should.equal(930);
  });

  it('applies rule4 correctly', () => {
    const bet = new betlib.Bet('single', 100, true);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5', rule4: 0.35}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5', rule4: 0.50}),
      new betlib.Selection('lose'),
    ]);

    returns.totalStake().should.equal(600);
    returns.numberOfBets().should.equal(6);
    returns.totalProfit().should.equal(96);
    returns.totalReturn().should.equal(696);
  })
});

describe('double bet', () => {
  it('does not work with less than 2 selections', () => {
    const bet = new betlib.Bet('double', 100, false);
    expect(() => {
      bet.settle([
        new betlib.Selection('win', 5.5, { placeOddsRatio: '1/5' }),
      ]);
    }).to.throw(betlib.InvalidSelectionCountError);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('double', 100, false);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
      new betlib.Selection('win', 2.75, {placeOddsRatio: '1/5'}),
    ]);

    returns.totalStake().should.equal(300);
    returns.numberOfBets().should.equal(3);
    returns.totalProfit().should.equal(1212.50);
    returns.totalReturn().should.equal(1512.50);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('double', 100, true);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
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
	new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
	new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      ]);
    }).to.throw(betlib.InvalidSelectionCountError);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('treble', 100, false);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
      new betlib.Selection('win', 5/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 4/3, {placeOddsRatio: '1/5'}),
    ]);

    returns.totalStake().should.equal(1000);
    returns.numberOfBets().should.equal(10);
    returns.totalProfit().should.be.closeTo(222.22, 0.5);
    returns.totalReturn().should.be.closeTo(1222.22, 0.5);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('treble', 100, true);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
      new betlib.Selection('win', 5/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 4/3, {placeOddsRatio: '1/5'}),
    ]);

    returns.totalStake().should.equal(2000);
    returns.numberOfBets().should.equal(20);
    returns.totalProfit().should.be.closeTo(475.80, 0.5);
    returns.totalReturn().should.be.closeTo(2475.80, 0.5);
  });
});

describe('accumulator bet', () => {
  it('requires a fold size of at least 4', () => {
    expect(() => {
      new betlib.Bet('accumulator:3', 100, false);
    }).to.throw(Error);
  });

  it('non-each-way is calculated correctly', () => {
    const bet = new betlib.Bet('accumulator:4', 100, false);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 2),
      new betlib.Selection('win', 5/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 4/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
      new betlib.Selection('lose'),
      new betlib.Selection('place', 2, {placeOddsRatio: '1/5'}),
    ]);

    returns.totalStake().should.equal(7000);
    returns.numberOfBets().should.equal(70);
    returns.totalProfit().should.be.closeTo(-4555.56, 0.01);
    returns.totalReturn().should.be.closeTo(2444.44, 0.01);
  });

  it('each-way is calculated correctly', () => {
    const bet = new betlib.Bet('accumulator:5', 100, true);
    const returns = bet.settle([
      new betlib.Selection('win', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('place', 5.5, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 2, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 5/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('win', 4/3, {placeOddsRatio: '1/5'}),
      new betlib.Selection('lose'),
      new betlib.Selection('lose'),
      new betlib.Selection('place', 2, {placeOddsRatio: '1/5'}),
    ]);

    returns.totalStake().should.equal(11200);
    returns.numberOfBets().should.equal(112);
    returns.totalProfit().should.be.closeTo(-8347.47, 0.01);
    returns.totalReturn().should.be.closeTo(2852.53, 0.01);
  });
});
