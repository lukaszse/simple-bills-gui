export interface Transaction {
  user: string;
  transactionNumber: string;
  type: TransactionType;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE"
}
