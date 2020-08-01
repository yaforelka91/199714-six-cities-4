import React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getAuthorizationProgress} from '../../reducer/user/selectors.js';
import {AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as FavoritesOperation} from '../../reducer/favorites/favorites.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {getLoadingStatus, getError, getOffers} from '../../reducer/data/selectors.js';
import Favorites from '../favorites/favorites.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import {getGroupedFavoriteOffers} from '../../reducer/favorites/selectors.js';
import ErrorScreen from '../error-screen/error-screen.jsx';

const App = ({
  authorizationStatus,
  isOffersLoading,
  isAuthorizationInProgress,
  errorType,
  offers,
  favoriteOffers,
  onFavoriteButtonClick,
}) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={() => {
          return (
            <Page
              className='page--gray page--main'
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => {
                return <Main />;
              }}
            />
          );
        }}
        />
        <Route exact path={`${AppRoute.OFFER}/:id`} render={({match}) => {
          return (
            <Page
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => {
                const offer = offers.find((hotel) => hotel.id === +match.params.id);

                if (offer) {
                  return (
                    <OfferPage
                      onFavoriteButtonClick={onFavoriteButtonClick}
                      authorizationStatus={authorizationStatus}
                      offer={offer}
                    />
                  );
                } else {
                  return <ErrorScreen message='offer does not exist' />;
                }
              }}
            />
          );
        }}
        />
        <Route exact path={AppRoute.LOGIN} render={() => {
          if (authorizationStatus === AuthorizationStatus.AUTH) {
            return <Redirect to={AppRoute.ROOT} />;
          }

          return (
            <Page
              className='page--gray page--login'
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => {
                return <Login />;
              }}
            />
          );
        }}
        />
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          authorizationStatus={authorizationStatus}
          isAuthorizationInProgress={isAuthorizationInProgress}
          render={() => {
            return (
              <Page
                className={`${favoriteOffers.length === 0 ? `page--favorites-empty` : ``}`}
                hasFooter={true}
                errorMessage={errorType}
                isLoading={isAuthorizationInProgress || isOffersLoading}
                renderPage={() => {
                  return <Favorites />;
                }}
              />
            );
          }}
        />
        <Route
          render={() => (
            <Page
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => {
                return <ErrorScreen message='page is not exist' />;
              }}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

App.defaultProps = {
  isAuthorizationInProgress: false,
  isOffersLoading: false,
  errorType: ``,
};
App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  favoriteOffers: getGroupedFavoriteOffers(state),
  offers: getOffers(state),
  isAuthorizationInProgress: getAuthorizationProgress(state),
  isOffersLoading: getLoadingStatus(state),
  errorType: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(FavoritesOperation.changeFavoriteStatus(hotel));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
