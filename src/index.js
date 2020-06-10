import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const offersData = {
    offersCount: 312,
  };

  reactDOM.render(
      <App offersCount={offersData.offersCount} />,
      document.querySelector(`#root`)
  );
};

init();
