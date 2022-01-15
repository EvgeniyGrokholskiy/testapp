import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import {BrowserRouter} from "react-router-dom";

import 'reset-css';
import 'normalize.css';
import 'styles.scss';

import App from './components/app'

const firebaseConfig = {
    apiKey: "AIzaSyDTLstUk3KREK9GfCM4uh-cMVQxnQjLkrk",
    authDomain: "web-pack-product-test.firebaseapp.com",
    databaseURL: "https://web-pack-product-test-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "web-pack-product-test",
    storageBucket: "web-pack-product-test.appspot.com",
    messagingSenderId: "384860722185",
    appId: "1:384860722185:web:451e0345c2ab444294d4d8"
};

const app = initializeApp(firebaseConfig);

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
