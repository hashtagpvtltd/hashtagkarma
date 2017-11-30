import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();

if(process.env.DEPLOYMENT === 'production'){

}
else{
  localStorage.setItem('apiRoot', 'http://localhost:5000');
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
