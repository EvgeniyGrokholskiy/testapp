import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { initializeApp } from "firebase/app";
import {BrowserRouter} from "react-router-dom";
import {firebaseconfig} from "./firebaseconfig";

import "reset-css";
import "styles.scss";
import "normalize.css";

const app = initializeApp(firebaseconfig);

window.addEventListener('dragover', (e) => {
  // e = e || event;
  e.preventDefault();
}, false);

window.addEventListener('drop', (e) => {
  // e = e || event;
  e.preventDefault();
}, false);

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('reactMount'),
);
