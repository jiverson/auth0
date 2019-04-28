import { createBrowserHistory } from "history";
import { Provider } from "mobx-react";
import { syncHistoryWithStore } from "mobx-react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import App from "./components/App";
import Callback from "./pages/Callback";
import RootStore from "./stores/RootStore";

const browserHistory = createBrowserHistory();
const rootStore = new RootStore();
const history = syncHistoryWithStore(browserHistory, rootStore.routing);

rootStore.quote.loadQuotes();

ReactDOM.render(
  <Provider store={rootStore.quote} authStore={rootStore.auth} routing={rootStore.routing}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route exact path="/home" component={Home} /> */}
        <Route exact path="/callback" component={Callback} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
