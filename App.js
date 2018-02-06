import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThank from 'redux-thunk';
import reducers from './src/redux/reducers';
//import Main from './src/components/Main';
import Router from './src/components/Router';

export default class App extends Component<{}> {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThank));
    return (
      <Provider store={store} >
     <Router />
      </Provider>
    );
  }
}
