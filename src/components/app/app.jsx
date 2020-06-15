import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

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
  offersList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
