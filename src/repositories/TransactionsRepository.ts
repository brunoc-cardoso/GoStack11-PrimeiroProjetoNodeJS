import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface GetBalance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);

    const outcomeSum = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, t) => acc + t.value, 0);

    const result = incomeSum - outcomeSum;

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total: result,
    };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
