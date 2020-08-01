import React from 'react';
import {errorScreenTypes} from '../../types/types.js';

const ErrorScreen = ({message}) => {
  return (
    <section>
      <div style={{textAlign: `center`, fontSize: `24`}}>
        <b>
        Sorry, something went wrong :( Please, come back later
        </b>
        <p>It happens because {message}</p>
      </div>
    </section>
  );
};

ErrorScreen.propTypes = errorScreenTypes;

export default ErrorScreen;
