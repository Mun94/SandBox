import React from "react";
import { Route } from "react-router-dom";
import Home from "./page/Home.js";

function App() {
  return (
    <>
      <Route path="/" component={Home} exact />
    </>
  );
}

export default App;
