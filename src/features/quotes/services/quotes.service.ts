import { QUOTES, QuoteMode } from "../types/quotes.types.ts";

const getRandomQuote = (quoteMode: QuoteMode): { text: string; author: string } => {
  return QUOTES[quoteMode][Math.floor(Math.random() * QUOTES[quoteMode].length)];
};

export { getRandomQuote };
