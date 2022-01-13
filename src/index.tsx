import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'

import 'reset-css';
import 'normalize.css';
import 'styles.scss';

window.addEventListener('dragover', (e) => {
  // e = e || event;
  e.preventDefault();
}, false);
window.addEventListener('drop', (e) => {
  // e = e || event;
  e.preventDefault();
}, false);

ReactDOM.render(
  <App />,
  document.getElementById('reactMount'),
);
