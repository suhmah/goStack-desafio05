import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestTransactionDTO): Transaction {
    if(type == "outcome") {
       const { total } = this.transactionsRepository.getBalance();

       if(value > total) {
         throw Error('O valor a ser debitado é maior do que o saldo disponível!');
       }
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value
    });

    return transaction;
  }
}

export default CreateTransactionService;
