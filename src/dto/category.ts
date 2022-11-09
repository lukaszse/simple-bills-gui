export interface Category {
  name: string;
  transactionType: TransactionType;
  limit: number;
}

export enum TransactionType {
  EXPENSE = "EXPENSE", INCOME = "INCOME"
}
