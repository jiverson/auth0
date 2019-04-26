import { action, observable } from "mobx";
import QuoteModel from "../models/QuoteModel";

const api = "http://localhost:3004/api/quotes";

export default class AppStore {
  @observable quotes: Array<QuoteModel> = [];
  @observable selectedQuote: QuoteModel;

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

  async loadQuotes(params: any): Promise<any> {
    // TODO implement
    this.isNextPageLoading = true;
    // const response = await fetch(`/jobs?${queryString.stringify(params)}`);
    const response = await fetch(api);
    const result = await response.json();

    this.isNextPageLoading = false;

    if (response.status !== 200) {
      throw Error(result.message);
    }
    this.quotes = [...this.quotes].concat(result);
  }
}
