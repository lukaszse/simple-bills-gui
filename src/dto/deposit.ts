export interface Deposit {
  name: string;
  depositType: DepositType;
  bankName: string;
  durationInMonths: number;
  annualInterestRate: number
}

export enum DepositType {
  PERPETUAL = "PERPETUAL",
  TERM = "TERM"
}
