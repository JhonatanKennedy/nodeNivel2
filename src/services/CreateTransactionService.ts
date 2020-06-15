import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }

  // eslint-disable-next-line class-methods-use-this
  public execute2(): Balance {
    const transactions = this.transactionsRepository.all();
    let income = 0;
    let incomeTotal = 0;
    let outcome = 0;
    let outcomeTotal = 0;

    transactions.forEach((currentTransaction: Transaction) => {
      if (currentTransaction.type === 'income') {
        income += 1;
        incomeTotal += currentTransaction.value;
      } else {
        outcome += 1;
        outcomeTotal += currentTransaction.value;
      }
    });
    const value = incomeTotal - outcomeTotal;

    const balance: Balance = {
      income,
      outcome,
      total: value,
    };

    return balance;
  }
}
export default CreateTransactionService;
