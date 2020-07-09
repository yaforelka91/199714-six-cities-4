import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';

const Page = (props) => {
  const {className, children} = props;

  return (
    <div className={`page ${className}`}>
      <Header />

      {children}
    </div>
  );
};

Page.defaultProps = {
  className: ``
};

Page.propTypes = pageTypes;

export default Page;
