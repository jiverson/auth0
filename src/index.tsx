import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import QuoteStore from "./stores/QuoteStore";

const quoteStore = new QuoteStore();
quoteStore.loadQuotes("foo");

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={quoteStore}>
    <App />
  </Provider>,
  rootElement
);
