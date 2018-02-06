import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThank from 'redux-thunk';
import reducers from './src/redux/reducers';
import Router from './src/components/Router';
//import Anasayfa from './src/components/AnaSayfa';

export default class App extends Component<{}> {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThank));
    return (
      <Provider store={store} >
      <View style={{ flex: 1 }} >
             <Router />
      </View>
      </Provider>
    );
  }
}
