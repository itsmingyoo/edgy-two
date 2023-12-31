import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';

// 
const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user) ? props.children : <>
        <h1>Login is required to view this page :(</h1>
        <LoginFormModal />
      </>}
    </Route>
  )
};


export default ProtectedRoute;
