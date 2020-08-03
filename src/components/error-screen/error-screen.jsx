import React, {Fragment} from 'react';
import {errorScreenTypes} from '../../types/types.js';
import {AppRoute} from '../../const.js';
import {Link} from 'react-router-dom';

const ErrorScreen = ({message, isNotFound}) => {
  return (
    <section>
      <div style={{textAlign: `center`, fontSize: `24`}}>
        {isNotFound &&
        <Fragment>
          <h1>
            Oops! It is 404.
            <br />
            <span>Page not found</span>
          </h1>
          <p>It happens because {message}</p>
          <Link to={AppRoute.ROOT}>Go to main page</Link>
        </Fragment>
        }
        {!isNotFound &&
        <Fragment>
          <b>Sorry, something went wrong :( Please, come back later</b>
          <p>It happens because {message}</p>
        </Fragment>
        }
      </div>
    </section>
  );
};

ErrorScreen.defaultProps = {
  isNotFound: true,
};
ErrorScreen.propTypes = errorScreenTypes;

export default ErrorScreen;
