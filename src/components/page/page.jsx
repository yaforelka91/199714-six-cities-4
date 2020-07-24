import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';

const Page = ({className, authorizationStatus, userData, isLoading, children}) => {
  console.log(isLoading);
  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
      <Header authorizationStatus={authorizationStatus} userData={userData} />
      {isLoading ? <p>Loading...</p> : children}
    </div>
  );
};

Page.defaultProps = {
  className: ``
};

Page.propTypes = pageTypes;

export default Page;
