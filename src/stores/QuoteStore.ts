import { action, observable } from "mobx";
import QuoteModel from "../models/QuoteModel";
import { loadAll, QuotesResponse, searchByAuthor, searchById, searchByText } from "../services";

export default class QuoteStore {
  @observable quotes: Array<QuoteModel> = [];
  @observable selectedQuote: QuoteModel;
  @observable rowCount: number;

  hasNextPage = false;
  isNextPageLoading = true;
  nextPage = -1;
  loadMoreItems: any;

  constructor() {}

  @action
  selectQuote(id: number) {
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
  async search(by: "author" | "text" | "id", value?: string) {
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
  async filterItem(by: "author" | "text" | "id", value?: string) {
    this.clearAll();
    this.loadMoreItems = () => this.search(by, value);
    return this.loadMoreItems();
  }

  async loadItems() {
    this.isNextPageLoading = true;
    const response = await loadAll(this.nextPage);
    this.parseResponse(response, this.quotes);
    this.isNextPageLoading = false;
  }

  async loadQuotes(): Promise<any> {
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
