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

  if (options.amount != null) {
    result.push(`AM:${options.amount.toFixed(2)}`);
  }

  if (options.currency != null) {
    result.push(`CC:${options.currency}`);
  }

  if (Number.isInteger(options.sendersReference)) {
    result.push(`RF:${options.sendersReference}`);
  }

  if (options.recipientName != null) {
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

  if (options.message != null) {
    result.push(`MSG:${escapeDisallowedCharacters(options.message.trim())}`);
  }

  if (options.constantSymbol != null) {
    result.push(`X-KS:${escapeDisallowedCharacters(options.constantSymbol)}`);
  }

  if (options.variableSymbol != null) {
    result.push(`X-VS:${escapeDisallowedCharacters(options.variableSymbol)}`);
  }

  if (options.specificSymbol != null) {
    result.push(`X-SS:${escapeDisallowedCharacters(options.specificSymbol)}`);
  }

  if (options.ownIdentifier != null) {
    result.push(`X-ID:${escapeDisallowedCharacters(options.ownIdentifier)}`);
  }

  return result.join("*");
}
