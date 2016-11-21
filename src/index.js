import React from 'react';
import { render } from 'react-dom';
import './css/style.css' // This could also go normally as a style tag in index.html
import StorePicker from './components/StorePicker';

render(<StorePicker/>, document.querySelector('#main'));
