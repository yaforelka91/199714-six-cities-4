import React from 'react';
import {AppRoute} from '../../types';
import {Link} from 'react-router-dom';

type Props = {
  message: string;
  isNotFound?: boolean;
};

const ErrorScreen: React.FC<Props> = (props: Props) => {
  const {
    message,
    isNotFound = true,
  } = props;

  return (
    <section>
      <div style={{textAlign: `center`, fontSize: `24`}}>
        {isNotFound &&
        <>
          <h1>
            Oops! It is 404.
            <br />
            <span>Page not found</span>
          </h1>
          <p>It happens because {message}</p>
          <Link to={AppRoute.ROOT}>Go to main page</Link>
        </>
        }
        {!isNotFound &&
        <>
          <b>Sorry, something went wrong :( Please, come back later</b>
          <p>It happens because {message}</p>
        </>
        }
      </div>
    </section>
  );
};

export default ErrorScreen;
