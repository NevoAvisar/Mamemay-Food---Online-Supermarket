// Format value as currency for display purposes
export const formatCurrency = (value) => {
  if (
    typeof value === "number" ||
    (/^\d*\.?\d*$/.test(value) && value !== "")
  ) {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(+value);
  }
  return value;
};
