import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import config from './config';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

if(config.DEBUG){
  localStorage.setItem('apiRoot', 'http://localhost:5000');
}
else{
  localStorage.setItem('apiRoot', 'http://hashtagkarma.herokuapp.com');
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
