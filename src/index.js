import React from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import App from "./App";
import './firebase'


const Root = props => {
  return (
    <App />
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
