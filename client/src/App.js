import React, { Component } from "react";
import "./assets/css/style.css";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./components/Routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
