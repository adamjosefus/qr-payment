export type BankAccount = {
  IBAN: string;
  BIC?: string;
};

export type CzechBankAccount = {
  prefix?: string;
  number: string;
  bankCode: string;
};

export type PaymentOptions = {
  account: BankAccount | CzechBankAccount;
  alternativeAccounts?: (BankAccount | CzechBankAccount)[];
  amount?: number;
  currency?: string;
  sendersReference?: number;
  recipientName?: string;
  variableSymbol?: string;
  constantSymbol?: string;
  specificSymbol?: string;
  ownIdentifier?: string;
  date?: Date;
  message?: string;
};
