import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts'
import filtersReducer from '../reducers/filters'
import userReducer from '../reducers/users';
import repliesReducer from '../reducers/replies';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      authUser: authReducer,
      posts: postsReducer,
      filters: filtersReducer,
      users: userReducer,
      replies: repliesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
