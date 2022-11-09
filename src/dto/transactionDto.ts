import { Type } from "./transaction";

export interface TransactionDto {
  type: Type,
  category: string;
  description: string;
  amount: number;
  date: string;
}
