export type BankAccount = {
  IBAN: string;
  BIC?: string | null;
};

export type CzechBankAccount = {
  prefix?: string | null;
  number: string;
  bankCode: string;
};

export type PaymentOptions = {
  account: BankAccount | CzechBankAccount;
  alternativeAccounts?: (BankAccount | CzechBankAccount)[];
  amount?: number | null;
  currency?: string | null;
  sendersReference?: number | null;
  recipientName?: string | null;
  variableSymbol?: string | null;
  constantSymbol?: string | null;
  specificSymbol?: string | null;
  ownIdentifier?: string | null;
  date?: Date | null;
  message?: string | null;
};
