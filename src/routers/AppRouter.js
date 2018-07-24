import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddPostPage from '../components/AddPostPage';
import EditPostPage from '../components/EditPostPage';
import AccountPage from '../components/AccountPage';
import NotFoundPage from '../components/NotFoundPage';
import PasswordForgotPage from '../components/PasswordForgotPage';
import SignupPage from '../components/SignupPage';
import LoginPage from '../components/LoginPage';
import AdminPage from '../components/AdminPage';
import HomePage from '../components/HomePage';
import EditProfilePage from '../components/EditProfilePage';
import ViewProfilePage from '../components/ViewProfilePage';
import PostPage from '../components/PostPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={HomePage} exact={true} />
        <PublicRoute path="/signup" component={SignupPage} />
        <PublicRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <PrivateRoute path="/passwordForgotPage" component={PasswordForgotPage} />
        <PrivateRoute path="/posts/new" component={AddPostPage} />
        <PrivateRoute path="/posts/:postId/edit" component={EditPostPage} />
        <PrivateRoute path="/posts/:postId" component={PostPage} exact={true}/>
        <PrivateRoute path="/account" component={AccountPage} exact={true}/>
        <PrivateRoute path="/account/edit-profile" component={EditProfilePage} />
        <PrivateRoute path="/account/view-profile" component={ViewProfilePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
