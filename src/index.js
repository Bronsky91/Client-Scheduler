import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Containers/Root';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Dosis', 'sans-serif']
  }
});

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
