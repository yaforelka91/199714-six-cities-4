import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthorizationStatus} from '../../reducer/user/user.js';

type Props = RouteProps & {
  authorizationStatus: string;
  isAuthorizationInProgress?: boolean;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const {
    render,
    path,
    exact,
    authorizationStatus,
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
