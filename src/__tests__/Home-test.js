"use strict";

import React from 'react';
import renderer from 'react-test-renderer';
import Home from "../pages/Home";

import { render } from '@testing-library/react'

import App from '../index.js'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
describe('With React Testing Library', () => {
  const initialState = {
    tours: []
  }
  const mockStore = configureStore()
  let store,wrapper;



  test('Поиск туров', () => {
    store = mockStore(initialState)
    const component = renderer.create(<Provider store={store}> <Home/></Provider>);

    const searchText = {
      target: {
        value: '5 ночей с 6 июля из Минска'
      }
    }

    const searchCity = {
      target: {
        value: 'Россия'
      }
    }


    component.getInstance().getSearchText(searchText);
    component.getInstance().getSearchCity(searchCity);
    component.getInstance().search();

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
  })
});
