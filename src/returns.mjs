function sum(list) {
  return list.reduce((acc, item) => {
    return acc + item;
  }, 0);
}

export class Returns {
  constructor(unitStake) {
    this.unitStake = unitStake;
    this.betReturns = [];
  }

  addBetReturn(betReturn) {
    this.betReturns.push(betReturn);
  }

  numberOfBets() {
    return this.betReturns.length;
  }

  totalStake() {
    return this.unitStake * this.numberOfBets();
  }

  totalProfit() {
    return this.totalReturn() - this.totalStake();
  }

  totalReturn() {
    return sum(this.betReturns);
  }
}
