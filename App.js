import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionList from './src/videos/containers/suggestion-list';
import API from './utils/api';
import CategoryList from './src/videos/containers/category-list';
import Player from './src/player/containers/player';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Loading from './src/sections/components/loading'


type Props = {};
export default class App extends Component<Props> {
  state = {
    // suggestionList: [],
    // categoryList: [],
  }
  async componentDidMount(){
    const categoryList = await API.getMovies()
    store.dispatch({
      type: 'SET_CATEGORY_LIST',
      payload: {
        categoryList
      }
    })
    const suggestionList = await API.getSuggestion(10)
    store.dispatch({
      type: 'SET_SUGGESTION_LIST',
      payload: {
        suggestionList
      }
    })
  }
  render() {
    return (
      <Provider
        store={store}
      >
        <PersistGate
          loading={<Loading/>}
          persistor={persistor}
          >
          <Home>
            <Header />
            <Player />
            <Text>buscador</Text>
            <Text>categorias</Text>
            <CategoryList />
            <SuggestionList />
          </Home>
        </PersistGate>
      </Provider>
    )
  }
}
