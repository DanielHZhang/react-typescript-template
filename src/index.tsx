import './index.less';
import './index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
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

interface CustomModule extends NodeModule {
  hot: {
    accept: (targetPath: string, callback: () => void) => void;
  };
}

if ((module as CustomModule).hot) {
  (module as CustomModule).hot.accept('./app', () => {
    const NextApp = require('./app').default;
    render(NextApp);
  });
  (module as CustomModule).hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default);
  });
}
