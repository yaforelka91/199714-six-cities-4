import React from 'react';
import {connect} from 'react-redux';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as FavoritesOperation} from '../../reducer/favorites/favorites.js';

import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {getOffers} from '../../reducer/data/selectors.js';

const App = ({login, authorizationStatus, userData, offers, onFavoriteButtonClick}) => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT} render={() => {
          return (
            <Page
              className='page--gray page--main'
              authorizationStatus={authorizationStatus}
              userData={userData}
              isLoading={offers.length === 0}
              isMain={true}
            >
              <Main />
            </Page>
          );
        }}
        />
        <Route exact path={`${AppRoute.OFFER}/:id`} render={({match}) => {
          return (
            <Page authorizationStatus={authorizationStatus} userData={userData} isLoading={offers.length === 0}>
              <OfferPage
                onFavoriteButtonClick={onFavoriteButtonClick}
                authorizationStatus={authorizationStatus}
                hotelId={+match.params.id}
                isLoading={offers.length === 0}
              />
            </Page>
          );
        }}
        />
        <Route exact path={AppRoute.LOGIN} render={() => {
          if (authorizationStatus === AuthorizationStatus.AUTH) {
            return <Redirect to={AppRoute.ROOT} />;
          }

          return (
            <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData} isLoading={offers.length === 0}>
              <Login
                activeCity={`Amsterdam`}
                onFormSubmit={login}
              />
            </Page>
          );
        }}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteButtonClick(hotel) {
    dispatch(FavoritesOperation.changeFavoriteStatus(hotel));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
