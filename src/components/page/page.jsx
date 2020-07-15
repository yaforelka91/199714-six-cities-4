import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';

const Page = ({className, children}) => {
  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
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
