import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';
import {getOffers} from '../../reducer/data/selectors.js';

const App = ({onOfferTitleClick, login, authorizationStatus, userData, offers}) => {

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
              <Main
                onOfferTitleClick={onOfferTitleClick}
              />
            </Page>
          );
        }}
        />
        <Route exact path={`${AppRoute.OFFER}/:id`} render={({match}) => {
          return (
            <Page authorizationStatus={authorizationStatus} userData={userData} isLoading={offers.length === 0}>
              <OfferPage
                hotelId={+match.params.id}
                onOfferTitleClick={onOfferTitleClick}
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
  activeCard: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
    dispatch(DataOperation.loadNearOffers(offer));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
