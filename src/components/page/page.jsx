import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';
import Footer from '../footer/footer.jsx';
import ErrorScreen from '../error-screen/error-screen.jsx';

const Page = ({className, hasFooter, isLoading, errorMessage, renderPage}) => {

  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
      <Header />
      {isLoading && <p>Loading...</p>}
      {!isLoading && errorMessage !== `` && <ErrorScreen message={errorMessage} isNotFound={false} />}
      {!isLoading && errorMessage === `` && renderPage()}
      {hasFooter && <Footer />}
    </div>
  );
};

Page.defaultProps = {
  hasFooter: false,
  isLoading: false,
  errorMessage: ``,
  className: ``,
};

Page.propTypes = pageTypes;

export default Page;
