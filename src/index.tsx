import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import AppStore from "./stores/AppStore";

const store = new AppStore();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
