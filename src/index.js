import React from 'react';
import { render } from 'react-dom';
import './css/style.css'; // This could also go normally as a style tag in index.html
import App from './components/App';
import StorePicker from './components/StorePicker';

render(<App />, document.querySelector('#main'));
