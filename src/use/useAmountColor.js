export function useAmountColor(amount) {
  return amount > 0 ? "text-positive" : amount < 0 ? "text-negative" : "text-grey-6";
}