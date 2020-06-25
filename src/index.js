import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offersList from './mocks/offers.js';

const init = () => {
  const settings = {
    offersList,
    offersCount: offersList.length,
  };

  reactDOM.render(
      <App settings={settings} />,
      document.querySelector(`#root`)
  );
};

init();
