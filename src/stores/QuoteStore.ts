import { action, observable } from "mobx";
import queryString from "query-string";
import QuoteModel from "../models/QuoteModel";

// const api = "http://localhost:3004/api/quotes";
const api = "https://auth0-exercise-quotes-api.herokuapp.com/api/quotes";
// GET /api/quotes?authorName=AlBeRt
// GET /api/quotes?text=wAnT
// GET /api/quotes?sortBy=-authorName,text
// GET /api/quotes/:id

type QuotesResponse = {
  results: Array<QuoteModel>;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    rowCount: number;
  };
};

export default class AppStore {
  @observable quotes: Array<QuoteModel> = [];
  @observable selectedQuote: QuoteModel;
  @observable rowCount: number;

  hasNextPage = true;
  isNextPageLoading = true;

  constructor() {}

  @action
  selectQuote(id: number) {
    this.selectedQuote = this.quotes.find((q) => q.id === id);
  }

  @action
  clearAll() {
    this.quotes = [];
    this.selectedQuote = null;
  }

  @action
  editQuote(id: number, data: Partial<QuoteModel>) {
    // TODO implement
  }

  @action
  searchItem(value?: string) {
    // TODO implement
  }

  @action
  filterItem(value?: string) {
    // TODO implement
  }

  async loadQuotes(params = { pageSize: 50 }): Promise<any> {
    this.isNextPageLoading = true;
    const response = await fetch(`${api}?${queryString.stringify(params)}`);
    if (response.status !== 200) {
      throw Error(response.status.toString());
    }

    const { results, pagination }: QuotesResponse = await response.json();
    this.rowCount = pagination.rowCount;
    this.hasNextPage = pagination.page < pagination.pageCount;
    this.quotes = [...this.quotes].concat(results);
    this.isNextPageLoading = false;
  }
}
