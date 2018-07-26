import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
// import 'normalize.css/normalize.css';
// import './styles/styles.scss';
import './styles/styles.css'
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';
import { startSetPosts } from './actions/posts'
import { startSetUsers, startAddUser } from './actions/users'

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
  console.log('auth changed')
  if (user) {
    store.dispatch(login(user.uid));
    const promise1 = store.dispatch(startSetPosts())
    const promise2 = store.dispatch(startSetUsers())
   
    Promise.all([promise1, promise2])
      .then(() => {
        const existingUsers = store.getState().users
        const userFound = !!existingUsers.find((existingUser) => {
          return existingUser.uid === user.uid
        })
        if (!userFound) { 
          store.dispatch(startAddUser('social'))
        }
        renderApp();
        if (history.location.pathname === '/') {
          history.push('/dashboard');
        }
      })
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})
