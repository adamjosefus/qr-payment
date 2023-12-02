import { expect, test } from "vitest";
import { computeSmartPaymentDescriptor } from "./computeSmartPaymentDescriptor";
import { PaymentOptions } from "./types";

const input: PaymentOptions = {
  account: {
    prefix: "19",
    number: "123457",
    bankCode: "0710",
  },
  amount: 987.65,
  currency: "CZK",
  variableSymbol: "1234567890",
  constantSymbol: "4443",
  specificSymbol: "1122334455",
  ownIdentifier: "moje_id_123",
  date: new Date("2024-12-31"),
  message: "Moje krásná zpráva pro příjemce! :)",
};

const expected =
  "SPD*1.0*ACC:CZ3507100000190000123457*AM:987.65*CC:CZK*DT:20241231*MSG:Moje kr%C3%A1sn%C3%A1 zpr%C3%A1va pro p%C5%99%C3%ADjemce! :)*X-KS:4443*X-VS:1234567890*X-SS:1122334455*X-ID:moje_id_123";

test("SPAYD", () => {
  expect(computeSmartPaymentDescriptor(input)).toBe(expected);
});
