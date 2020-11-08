import Transaction from '../models/Transaction';
import { v4 as uuid } from 'uuid';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
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
    let income = 0;
    let outcome = 0;

    this.transactions.map(transaction => {
      if(transaction.type == 'income') {
        income += transaction.value;
      }else if(transaction.type == 'outcome') {
        outcome += transaction.value;
      }
    });

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total
    }

    return balance;
  }

  public create({ title, value, type }: RequestTransactionDTO): Transaction {
    const transaction : Transaction = {
      id: uuid(),
      title,
      value,
      type
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
