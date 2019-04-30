export enum QuoteListFilter {
  ALL = 0,
  MINE
}

export const QUOTE_LIST_FILTER_TYPES = [QuoteListFilter.ALL, QuoteListFilter.MINE];

export const QUOTE_LIST_FILTER_TITLES = {
  [QuoteListFilter.ALL]: "All",
  [QuoteListFilter.MINE]: "Mine"
};

export const QUOTE_MIN_SEARCH = 4;
export const QUOTE_PAGE_SIZE = 50;
