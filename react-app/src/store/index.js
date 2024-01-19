import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import songsReducer from './songs';
import albumsReducer from './albums';
import likesReducer from './likes';
import playlistsReducer from './playlists';
import artistsReducer from './artists';

const rootReducer = combineReducers({
  session,
  albumsReducer,
  likesReducer,
  playlistsReducer,
  artistsReducer
  songsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
