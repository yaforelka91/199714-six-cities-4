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
const MainWrapped = withActiveCity(Main);

class App extends PureComponent {
  _renderApp() {
    const {
      activeCard,
      offersList,
      isError,
      onOfferTitleClick
    } = this.props;

    if (!activeCard) {
      return (
        <Page className='page--gray page--main'>
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

    if (activeCard) {
      return (
        <Page>
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
    const {onOfferTitleClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <Page>
              <OfferPage
                offer={offersMock[0]}
                offersList={offersMock}
                onOfferTitleClick={onOfferTitleClick}
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
  isError: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
