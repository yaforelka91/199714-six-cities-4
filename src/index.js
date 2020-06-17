import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offersList from './mocks/offers.js';

const init = () => {
  const offersData = {
    offersCount: 312
  };

  reactDOM.render(
      <App offersCount={offersData.offersCount} offersList={offersList} />,
      document.querySelector(`#root`)
  );
};

init();
