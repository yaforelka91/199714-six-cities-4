import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import {OfferTypes} from '../../const.js';


const offerTitleHandler = () => {};

const App = ({offersCount, offersList}) => {
  return <Main
    offersCount={offersCount}
    offersList={offersList}
    onOfferTitleClick={offerTitleHandler}
  />;
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersList: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf([
          OfferTypes.APARTMENT,
          OfferTypes.ROOM,
          OfferTypes.HOUSE,
          OfferTypes.HOTEL]).isRequired,
        isPremium: PropTypes.bool.isRequired,
        rating: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
};

export default App;
