import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {getActiveOffer} from '../../reducer/catalog/selectors.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import offersMock from '../../mocks/offers.js';
import withActiveCity from '../../hocs/with-active-city/with-active-city.js';
import {getOffers, getError} from '../../reducer/data/selectors.js';
import Login from '../login/login.jsx';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors.js';
import {Operation as UserOperation, AuthorizationStatus} from '../../reducer/user/user.js';
const MainWrapped = withActiveCity(Main);
const LoginWrapped = withActiveCity(Login);

class App extends PureComponent {
  _renderApp() {
    const {
      activeCard,
      offersList,
      authorizationStatus,
      login,
      userData,
      isError,
      onOfferTitleClick,
    } = this.props;

    if (!activeCard) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
            <LoginWrapped
              onFormSubmit={login}
            />
          </Page>
        );
      } else {
        return (
          <Page className='page--gray page--main' authorizationStatus={authorizationStatus} userData={userData}>
            {
              isError ?
                <p style={{fontSize: 32, textAlign: `center`}}>
                  <b>Sorry, something went wrong :( Please, come back later</b>
                </p> :
                <MainWrapped
                  offersList={offersList}
                  onOfferTitleClick={onOfferTitleClick}
                />
            }
          </Page>
        );
      }
    }

    if (activeCard) {
      return (
        <Page authorizationStatus={authorizationStatus} userData={userData}>
          <OfferPage
            offer={activeCard}
            offersList={offersList}
            onOfferTitleClick={onOfferTitleClick}
          />
        </Page>
      );
    }

    return null;
  }

  render() {
    const {onOfferTitleClick, login, authorizationStatus, userData} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <Page authorizationStatus={authorizationStatus} userData={userData}>
              <OfferPage
                offer={offersMock[0]}
                offersList={offersMock}
                onOfferTitleClick={onOfferTitleClick}
              />
            </Page>
          </Route>
          <Route exact path="/dev-login">
            <Page className='page--gray page--login' authorizationStatus={authorizationStatus} userData={userData}>
              <Login
                activeCity={{
                  name: `Amsterdam`,
                  coords: [0, 0],
                  zoom: 0,
                }}
                onFormSubmit={login}
              />
            </Page>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.defaultProps = {
  isError: false,
};

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: getActiveOffer(state),
  offersList: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
  isError: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
