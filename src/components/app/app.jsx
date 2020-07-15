import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';
import {appTypes} from '../../types/types.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

const MAX_CITIES_COUNT = 6;
const MainWrapped = withActiveItem(Main);

class App extends PureComponent {

  _renderApp() {
    const {
      activeCard,
      offersList,
      citiesList,
      city,
      activeSorting,
      onCityNameClick,
      onOfferTitleClick,
    } = this.props;

    const offersToRender = offersList.find((offer) => offer.city.id === city.id).offers;

    if (activeCard < 0) {
      return (
        <Page className='page--gray page--main'>
          <MainWrapped
            activeSorting={activeSorting}
            city={city}
            offersList={offersToRender}
            citiesList={citiesList}
            onOfferTitleClick={onOfferTitleClick}
            onCityNameClick={onCityNameClick}
          />
        </Page>
      );
    }

    if (activeCard >= 0) {
      return (
        <Page>
          <OfferPage
            offer={offersToRender.find((offer) => offer.id === activeCard)}
            offersList={offersToRender}
            city={city}
            onOfferTitleClick={onOfferTitleClick}
          />
        </Page>
      );
    }

    return null;
  }

  render() {
    const {offersList, city, onOfferTitleClick} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <Page>
              <OfferPage
                offer={offersList[0].offers[0]}
                offersList={offersList[0].offers}
                city={city}
                onOfferTitleClick={onOfferTitleClick}
              />
            </Page>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = appTypes;

const mapStateToProps = (state) => ({
  activeCard: state.activeCard,
  city: state.city,
  offersList: state.offersList,
  activeSorting: state.activeSorting,
  citiesList: state.offersList
    .map((offer) => offer.city)
    .slice(0, MAX_CITIES_COUNT),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onOfferTitleClick(offer) {
    dispatch(ActionCreator.setActiveCard(offer));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
