import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import Chat from "./ChatFunctional";
import Store from "../Store";

const App = () => {
        return (
            <Store>
            <BrowserRouter>
            <div>
            <Switch>
              <Route exact path ="/" component={Landing}/>
              <Route exact path ="/chat" component={Chat}/>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/register" component={Register}/>
            </Switch>
            </div>
          </BrowserRouter>
            </Store>
        );
}


ReactDOM.render(<App />, document.getElementById("app"));
