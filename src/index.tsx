import React from "react";
import ReactDOM from "react-dom";

import { HashRouter, Route } from "react-router-dom";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Main } from "./views/main";
import { Park } from "./views/park";
import { Pay } from "./views/pay";
import { Leave } from "./views/leave";
import { HomeButton } from "./components/home-button";

const Routes = () => (
  <HashRouter>
    <div className="container">
      <Route path="/" exact={true} component={Main} />
      <Route path="/park" component={Park} />
      <Route path="/pay/:ticketId?" component={Pay} />
      <Route path="/leave/:ticketId?" component={Leave} />
      <HomeButton />
    </div>
  </HashRouter>
);

ReactDOM.render(<Routes />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
