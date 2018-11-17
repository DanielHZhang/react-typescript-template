import './index.less';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer as HotReloader} from 'react-hot-loader';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers';
import App from './app';

const store = createStore(rootReducer, applyMiddleware(thunk));

const render = (Component: React.ComponentClass) => {
  ReactDOM.render(
    <HotReloader>
      <Provider store={store}>
        <Component />
      </Provider>
    </HotReloader>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    render(NextApp);
  });
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}
