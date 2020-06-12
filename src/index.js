import React from 'react';
import reactDOM from 'react-dom';
import App from './components/app/app.jsx';

const init = () => {
  const offersData = {
    offersCount: 312,
    offersList: [`Beautiful & luxurious apartment at great location`,
      `Wood and stone place`, `Canal View Prinsengracht`,
      `Nice, cozy, warm big bed apartment`, `Wood and stone place`]
  };

  reactDOM.render(
      <App offersCount={offersData.offersCount} offersList={offersData.offersList} />,
      document.querySelector(`#root`)
  );
};

init();
