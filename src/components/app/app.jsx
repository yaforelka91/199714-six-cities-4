import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = ({offersCount, offersList}) => {
  return <Main offersCount={offersCount} offersList={offersList} />;
};

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offersList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
