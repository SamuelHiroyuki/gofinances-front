import http, { Response } from './http';

export interface Category {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface Transaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  created_at: Date;
  updated_at: Date;
  category: Category;
}

export interface TransactionsList {
  transactions: Transaction[];
  balance: Balance;
}

export default {
  list: (): Response<TransactionsList> =>
    http.get<TransactionsList>('transactions'),
  // importCSV: () => {}
};
