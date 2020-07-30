import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute} from '../../const.js';
import {privateRouteTypes} from '../../types/types.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = privateRouteTypes;

export default PrivateRoute;
