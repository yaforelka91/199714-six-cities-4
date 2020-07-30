import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';
import Footer from '../footer/footer.jsx';

const Page = ({className, isLoading, hasFooter, children}) => {
  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
      <Header />
      {isLoading ? <p>Loading...</p> : children}
      {hasFooter && <Footer />}
    </div>
  );
};

Page.defaultProps = {
  hasFooter: false,
  className: ``,
};

Page.propTypes = pageTypes;

export default Page;
