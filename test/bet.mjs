import chai from "chai";

let should = chai.should(),
  expect = chai.expect;

import * as betlib from "../src/index.mjs";

const SELECTIONS = [
  new betlib.WinSelection({ winOdds: 9, placeOddsFraction: "1/4" }),
  new betlib.PlaceSelection({
    winOdds: 1 + 2 / 3,
    placeOddsFraction: "1/5",
    rule4: 0.15
  }),
  // counts as a loss in non-each way because tied for #2
  new betlib.DeadHeatSelection({
    winOdds: 8,
    placeOddsFraction: "1/5",
    rule4: 0.15,
    placesOffered: 3,
    tiedPosition: 2,
    runnersInDeadHeat: 4
  }),
  new betlib.VoidSelection(),
  new betlib.LoseSelection(),
  new betlib.WinSelection({ winOdds: 101, placeOddsFraction: "1/5" }),
  new betlib.WinSelection({ winOdds: 2, placeOddsFraction: "1/1", rule4: 0.2 }),
  new betlib.PlaceSelection({ winOdds: 1 + 3 / 2, placeOddsFraction: "1/3" }),
  new betlib.DeadHeatSelection({
    winOdds: 1 + 2 / 3,
    placeOddsFraction: "1/5",
    rule4: 0.35,
    placesOffered: 3,
    tiedPosition: 1,
    runnersInDeadHeat: 2
  })
];

const STAKE = 2;

const EXPECTED = {
  single: {
    nonEachWay: { bets: 9, totalReturns: 227.03 },
    eachWay: { bets: 18, totalReturns: 290.22 }
  },
  double: {
    nonEachWay: { bets: 36, totalReturns: 2599.28 },
    eachWay: { bets: 72, totalReturns: 3137.41 }
  },
  treble: {
    nonEachWay: { bets: 84, totalReturns: 7233.35 },
    eachWay: { bets: 168, totalReturns: 9410.82 }
  },
  "accumulator:4": {
    nonEachWay: { bets: 126, totalReturns: 7204.32 },
    eachWay: { bets: 252, totalReturns: 12163.21 }
  },
  trixie: {
    nonEachWay: { bets: 336, totalReturns: 25428.31 },
    eachWay: { bets: 672, totalReturns: 31372.72 }
  },
  yankee: {
    nonEachWay: { bets: 1386, totalReturns: 105189.28 },
    eachWay: { bets: 2772, totalReturns: 134513.83 }
  },
  superYankee: {
    nonEachWay: { bets: 3276, totalReturns: 237841.82 },
    eachWay: { bets: 6552, totalReturns: 320870.0 }
  },
  canadian: {
    nonEachWay: { bets: 3276, totalReturns: 237841.82 },
    eachWay: { bets: 6552, totalReturns: 320870.0 }
  },
  heinz: {
    nonEachWay: { bets: 4788, totalReturns: 317065.81 },
    eachWay: { bets: 9576, totalReturns: 461418.83 }
  },
  superHeinz: {
    nonEachWay: { bets: 4320, totalReturns: 249199.6 },
    eachWay: { bets: 8640, totalReturns: 401874.02 }
  },
  goliath: {
    nonEachWay: { bets: 2223, totalReturns: 106997.52 },
    eachWay: { bets: 4446, totalReturns: 197127.5 }
  },

  patent: {
    nonEachWay: { bets: 588, totalReturns: 31785.24 },
    eachWay: { bets: 1176, totalReturns: 39498.98 }
  },
  lucky15: {
    nonEachWay: { bets: 1890, totalReturns: 117903.15 },
    eachWay: { bets: 3780, totalReturns: 150766.34 }
  },
  lucky31: {
    nonEachWay: { bets: 3906, totalReturns: 253734.15 },
    eachWay: { bets: 7812, totalReturns: 341185.63 }
  },
  lucky63: {
    nonEachWay: { bets: 5292, totalReturns: 329779.68 },
    eachWay: { bets: 10584, totalReturns: 477671.34 }
  }
};

for (let betType in EXPECTED) {
  describe(betType + " bet", () => {
    it("calculates non each way bets correctly", () => {
      const bet = new betlib.Bet(betType, STAKE, false);
      let returns = bet.settle(SELECTIONS);

      returns
        .totalReturn()
        .should.be.closeTo(EXPECTED[betType].nonEachWay.totalReturns, 0.01);
      returns
        .totalStake()
        .should.equal(EXPECTED[betType].nonEachWay.bets * STAKE);
      returns.numberOfBets().should.equal(EXPECTED[betType].nonEachWay.bets);
    });

    it("calculates each way bets correctly", () => {
      const bet = new betlib.Bet(betType, STAKE, true);
      let returns = bet.settle(SELECTIONS);

      returns
        .totalReturn()
        .should.be.closeTo(EXPECTED[betType].eachWay.totalReturns, 0.01);
      returns.totalStake().should.equal(EXPECTED[betType].eachWay.bets * STAKE);
      returns.numberOfBets().should.equal(EXPECTED[betType].eachWay.bets);
    });
  });
}
