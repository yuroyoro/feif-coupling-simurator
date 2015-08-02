import React from "react";
import App   from "./components/App.jsx";
import Store from "./stores/Store.js";

Store.initialize();
window.Store = Store; // debug

React.render(
  <App />,
  document.getElementById("feifapp")
);
