/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createSlice, configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'
import Main from './Main';
import { store } from './store';


function App() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
