import React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {History} from 'history';
import Page from '../page/page';
import Main from '../main/main';
import OfferPage from '../offer-page/offer-page';
import Login from '../login/login';
import {getAuthorizationStatus, getAuthorizationProgress} from '../../reducer/user/selectors';
import {AuthorizationStatus} from '../../reducer/user/user';
import {AppRoute} from '../../types';
import {getLoadingStatus, getError, getOffers} from '../../reducer/data/selectors';
import Favorites from '../favorites/favorites';
import PrivateRoute from '../private-route/private-route';
import {getGroupedFavoriteOffers} from '../../reducer/favorites/selectors';
import ErrorScreen from '../error-screen/error-screen';
import NoPlaces from '../no-places/no-places';
import Offer from '../../interfaces/offer';

type Props = {
  authorizationStatus: string;
  favoriteOffers: {
    [key: string]: Offer[];
  }[];
  history: History;
  offers: Offer[];
  isAuthorizationInProgress?: boolean;
  isOffersLoading?: boolean;
  errorType?: string;
}

const App: React.FC<Props> = (props: Props) => {
  const {
    authorizationStatus,
    favoriteOffers,
    history,
    offers,
    isAuthorizationInProgress = false,
    isOffersLoading = false,
    errorType = ``,
  } = props;

  if (!isOffersLoading && !isAuthorizationInProgress && errorType === `` && offers.length === 0) {
    return (
      <div className="page page--gray page--main">
        <main className="page__main page__main--index page__main--index-empty">
          <div className="cities">
            <div className="cities__places-container container">
              <NoPlaces />
              <div className="cities__right-section" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={() => {
          return (
            <Page
              className='page--gray page--main'
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => <Main />}
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
              renderPage={() => <Login />}
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
                renderPage={() => <Favorites />}
              />
            );
          }}
        />
        <Route
          render={() => (
            <Page
              errorMessage={errorType}
              isLoading={isAuthorizationInProgress || isOffersLoading}
              renderPage={() => <ErrorScreen message='page is not exist' />}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  favoriteOffers: getGroupedFavoriteOffers(state),
  offers: getOffers(state),
  isAuthorizationInProgress: getAuthorizationProgress(state),
  isOffersLoading: getLoadingStatus(state),
  errorType: getError(state),
});

export {App};
export default connect(mapStateToProps)(App);
