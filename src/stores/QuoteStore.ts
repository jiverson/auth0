import { action, computed, observable } from "mobx";
import { QuoteListFilter, QUOTE_LIST_FILTER_TITLES } from "../constants";
import QuoteModel from "../models/QuoteModel";
import { loadAll, myQuotes, QuotesResponse, searchByAuthor, searchById, searchByText } from "../services";
import RootStore from "./RootStore";

type SearchBy = "author" | "text" | "id";

export default class QuoteStore {
  @observable quotes: Array<QuoteModel> = [];
  @observable selectedQuote: QuoteModel;
  @observable rowCount: number;
  @observable quoteListFilter: string;

  hasNextPage = false;
  isNextPageLoading = true;
  nextPage = -1;
  loadMoreItems: any;

  constructor(private rootStore: RootStore) {}

  @computed
  get isMyQuoteList(): boolean {
    return this.quoteListFilter === QUOTE_LIST_FILTER_TITLES[QuoteListFilter.MINE];
  }

  @action
  selectQuote(id: number | string) {
    this.selectedQuote = this.quotes.find((q) => q.id === id);
  }

  @action
  clearAll() {
    this.quotes = [];
    this.selectedQuote = null;
    this.nextPage = -1;
    this.hasNextPage = false;
    this.loadMoreItems = () => {};
  }

  @action
  async search(by: SearchBy, value?: string) {
    if (!value) {
      return;
    }
    this.isNextPageLoading = true;
    let response: QuotesResponse;

    switch (by) {
      case "author":
        response = await searchByAuthor(value, this.nextPage);
        break;
      case "text":
        response = await searchByText(value, this.nextPage);
        break;
      case "id":
        response = await searchById(value);
        break;
    }

    this.parseResponse(response, this.quotes);
    this.isNextPageLoading = false;
  }

  @action
  async filterItem(by: SearchBy, value?: string) {
    this.clearAll();
    this.loadMoreItems = () => this.search(by, value);
    return this.loadMoreItems();
  }

  @action
  async loadMyQuotes(): Promise<any> {
    this.quoteListFilter = QUOTE_LIST_FILTER_TITLES[QuoteListFilter.MINE];
    this.clearAll();
    const quotes = await myQuotes();
    this.quotes = [].concat(quotes);
  }

  async loadItems() {
    this.isNextPageLoading = true;
    const response = await loadAll(this.nextPage);
    this.parseResponse(response, this.quotes);
    this.isNextPageLoading = false;
  }

  async loadQuotes(): Promise<any> {
    this.quoteListFilter = QUOTE_LIST_FILTER_TITLES[QuoteListFilter.ALL];
    this.loadMoreItems = () => this.loadItems();
    return this.loadMoreItems();
  }

  parseResponse(response: QuotesResponse, list: Array<QuoteModel>) {
    const { results, pagination } = response;
    this.rowCount = pagination.rowCount;
    this.hasNextPage = pagination.page < pagination.pageCount;
    this.nextPage = this.hasNextPage ? pagination.page + 1 : pagination.page;
    this.quotes = [...list].concat(results);
  }
}
