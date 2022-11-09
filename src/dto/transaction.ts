export interface Transaction {
  user: string;
  transactionNumber: string;
  type: Type;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export enum Type {
  INCOME = "income",
  EXPENSE = "expense"
}
