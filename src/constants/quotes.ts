export enum QuoteFilter {
  ALL = 0,
  MINE
}

export const QUOTE_FILTER_TYPES = [QuoteFilter.ALL, QuoteFilter.MINE];

export const QUOTE_FILTER_TITLES = {
  [QuoteFilter.ALL]: "All",
  [QuoteFilter.MINE]: "Mine"
};

export const QUOTE_MIN_SEARCH = 4;
export const QUOTE_PAGE_SIZE = 50;

export const QUOTE_FILTER_LOCATION_HASH = {
  [QuoteFilter.ALL]: "#",
  [QuoteFilter.MINE]: "#active"
};
