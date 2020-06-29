import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from '../main/main.jsx';
import OfferPage from '../offer-page/offer-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedOffer: null,
    };

    this._handleOfferTitleClick = this._handleOfferTitleClick.bind(this);
  }

  _handleOfferTitleClick(offer) {
    this.setState({
      selectedOffer: offer,
    });
  }

  _renderApp() {
    const {
      offersList,
      citiesList,
      city,
      onCityNameClick
    } = this.props;

    const {selectedOffer} = this.state;

    if (!selectedOffer) {
      return (
        <Main
          city={city}
          offersList={offersList}
          citiesList={citiesList}
          onOfferTitleClick={this._handleOfferTitleClick}
          onCityNameClick={onCityNameClick}
        />
      );
    }

    if (selectedOffer) {
      return (
        <OfferPage
          offer={selectedOffer}
          offersList={offersList}
          city={city}
          onOfferTitleClick={this._handleOfferTitleClick}
        />
      );
    }

    return null;
  }

  render() {
    const {offersList} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-page">
            <OfferPage offer={offersList[0].offers}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offersList: PropTypes.arrayOf(
      PropTypes.shape().isRequired
  ).isRequired,
  city: PropTypes.number.isRequired,
  onCityNameClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offersList: state.offersList.find((offer) => offer.city.id === state.city.id).offers,
  citiesList: state.offersList.map((offer) => offer.city),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(cityId) {
    dispatch(ActionCreator.changeCity(cityId));
    dispatch(ActionCreator.getOffers(cityId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
