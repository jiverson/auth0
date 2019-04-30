import { RouterStore } from "mobx-react-router";
import AuthStore from "./AuthStore";
import QuoteStore from "./QuoteStore";

export default class RootStore {
  auth: AuthStore;
  quote: QuoteStore;
  routing: RouterStore;

  constructor() {
    this.auth = new AuthStore(this);
    this.quote = new QuoteStore(this);
    this.routing = new RouterStore();
  }
}
