export const getMinPrice = (variants: any[]) => {
  if (!Array.isArray(variants) || variants.length === 0) {
    return null;
  }

  const prices = variants
    .map((variant: any) => variant?.actual_price)
    .filter((price) => typeof price === "number");
  if (prices.length === 0) {
    return null;
  }

  return Math.min(...prices);
};
