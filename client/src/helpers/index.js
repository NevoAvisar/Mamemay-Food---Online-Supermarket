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

export const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(null, args), delay);
  };
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("he-IL");
};
