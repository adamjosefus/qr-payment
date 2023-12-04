import { computeIBANFromCzechBankAccount } from "./utils/computeIBANFromCzechBankAccount";
import { escapeDisallowedCharacters } from "./utils/escapeDisallowedCharacters";
import { PaymentOptions } from "./types";

function getAccountString(account: PaymentOptions["account"]) {
  if ("IBAN" in account) {
    const IBAN = account.IBAN;
    const BIC = account.BIC ?? null;

    return `${IBAN}${BIC != null ? `+${BIC}` : ""}`;
  } else {
    return computeIBANFromCzechBankAccount(account);
  }
}

function isStringValid(value: string | null | undefined): value is string {
  return value != null && value.trim() !== "";
}

function isPositiveInteger(value: number | null | undefined): value is number {
  return value != null && Number.isInteger(value) && value >= 0;
}

export function getShortPaymentDescriptor(options: PaymentOptions): string {
  const result: string[] = ["SPD*1.0"];

  result.push(`ACC:${getAccountString(options.account)}`);

  if (options.alternativeAccounts != null) {
    result.push(
      `ALT-ACC:${options.alternativeAccounts
        .map((account) => getAccountString(account))
        .join(",")}`
    );
  }

  if (options.amount != null && options.amount > 0) {
    result.push(`AM:${options.amount.toFixed(2)}`);
  }

  if (isStringValid(options.currency)) {
    result.push(`CC:${options.currency.trim()}`);
  }

  if (isPositiveInteger(options.sendersReference)) {
    result.push(`RF:${options.sendersReference}`);
  }

  if (isStringValid(options.recipientName)) {
    result.push(
      `RN:${escapeDisallowedCharacters(options.recipientName.trim())}`
    );
  }

  if (options.date != null) {
    const yyyy = options.date.getFullYear().toString();
    const mm = (options.date.getMonth() + 1).toString().padStart(2, "0");
    const dd = options.date.getDate().toString().padStart(2, "0");

    result.push(`DT:${yyyy}${mm}${dd}`);
  }

  if (isStringValid(options.message)) {
    result.push(`MSG:${escapeDisallowedCharacters(options.message.trim())}`);
  }

  if (isStringValid(options.constantSymbol)) {
    result.push(
      `X-KS:${escapeDisallowedCharacters(options.constantSymbol.trim())}`
    );
  }

  if (isStringValid(options.variableSymbol)) {
    result.push(
      `X-VS:${escapeDisallowedCharacters(options.variableSymbol.trim())}`
    );
  }

  if (isStringValid(options.specificSymbol)) {
    result.push(
      `X-SS:${escapeDisallowedCharacters(options.specificSymbol.trim())}`
    );
  }

  if (isStringValid(options.ownIdentifier)) {
    result.push(
      `X-ID:${escapeDisallowedCharacters(options.ownIdentifier.trim())}`
    );
  }

  return result.join("*");
}
