import { Type } from "./transaction";

export interface TransactionDto {
  transactionNumber: string | number;
  type: Type,
  category: string;
  description: string;
  amount: number;
  date: string;
}
