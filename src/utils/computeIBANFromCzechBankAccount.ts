import { CzechBankAccount } from "../types";

export function computeIBANFromCzechBankAccount(
  account: CzechBankAccount
): string {
  // Preprocess the numbers
  const accountPrefix = (account.prefix ?? "").padStart(6, "0");
  const accountNumber = account.number.padStart(10, "0");
  const accountBank = account.bankCode.padStart(4, "0");

  // Calculate the check sum
  const buf = `${accountBank}${accountPrefix}${accountNumber}123500`;
  let index = 0;
  let dividend: string;
  let pz = -1;

  while (index <= buf.length) {
    if (pz < 0) {
      dividend = buf.substring(index, Math.min(index + 9, buf.length));
      index += 9;
    } else if (pz >= 0 && pz <= 9) {
      dividend = pz + buf.substring(index, Math.min(index + 8, buf.length));
      index += 8;
    } else {
      dividend = pz + buf.substring(index, Math.min(index + 7, buf.length));
      index += 7;
    }

    pz = parseInt(dividend) % 97;
  }
  pz = 98 - pz;

  // Assign the checksum
  const checksum = pz.toString().padStart(2, "0");

  // Build the IBAN number
  return `CZ${checksum}${accountBank}${accountPrefix}${accountNumber}`;
}
