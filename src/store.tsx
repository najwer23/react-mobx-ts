import { makeAutoObservable } from "mobx";

// Standard interface and functions
interface Tran {
  id: number;
  tran: string;
	amount: number;
}

const removeTran = (transactions: Tran[], id: number): Tran[] => {
  return transactions.filter((tran) => tran.id !== id);
}

const addNewTran = (transactions: Tran[], tran: string, amount: number): Tran[] => [
  ...transactions,
  {
    id: Math.max(0, Math.max(...transactions.map(({ id }) => id))) + 1,
    tran,
		amount,
  },
];

// MobX implementation
class Transactions {
  transactions: Tran[] = [];
  tranName: string = "";
  euro: number = 0;
  amount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  removeTran(id: number) {
    this.transactions = removeTran(this.transactions, id);
		this.total();
  }

  addNewTran() {
    this.transactions = addNewTran(this.transactions, this.tranName, this.amount);
    this.tranName = "";
    this.amount = 0;

		this.total();
  }

	convertToEuro(n: number) {
		return Number((n / this.euro).toFixed(2));
	}

	total() {
		return this.sum(this.transactions.map(value => value.amount))
	}

	sum (arr: Array<number>) {
		return arr.reduce((a,b) => a + b, 0);
	}

  async loadCurrency() {
		try {
			let response = await fetch("https://api.nbp.pl/api/exchangerates/rates/a/eur/?format=json");
			let json = await response.json();
			this.euro = json.rates[0].mid;
		} catch(e) {
			this.euro = 4.382;
		}

  }
}

const store = new Transactions();

export default store;