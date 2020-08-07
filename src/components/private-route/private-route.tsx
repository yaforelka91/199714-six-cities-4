import React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AppRoute} from '../../types';
import {AuthorizationStatus} from '../../reducer/user/user';

type Props = RouteProps & {
  authorizationStatus: string;
  render: () => React.ReactNode;
  isAuthorizationInProgress?: boolean;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const {
    authorizationStatus,
    render,
    path,
    exact,
    isAuthorizationInProgress = false,
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        if (isAuthorizationInProgress) {
          return <p>Check autorization...</p>;
        }

        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

export default PrivateRoute;
