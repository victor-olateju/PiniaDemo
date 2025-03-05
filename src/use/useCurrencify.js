// CURRENCY FORMATTER
export function useCurrencify(amount) {
  const posNegSymbol = amount > 0 ? "+" : "-";

  const amountFormatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${posNegSymbol} ${amountFormatted}`;
}
