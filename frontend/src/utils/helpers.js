// 645,323,903.98
export const plainFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

// $645B
export const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

// 19B, 100T, 700K
export const plainNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
});


// 67,480
export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// How much USD does an amount of crypto cost
export function cryptoToUSD(amount, cost){
  return amount * cost
}

// How much crypto can I get for an amount of USD
export function usdToCrypto(amount, cost){
  return amount / cost
}

export function truncate(text) {
  if (!text) return "";
  const words = text.split(" ");
  // If the total number of words is less than or equal to numWords, just return the whole text
  if (words.length <= 25) return text;
  // Otherwise, join the first 35 and add "..." to indicate truncation
  return words.slice(0, 25).join(" ") + "...";
}
