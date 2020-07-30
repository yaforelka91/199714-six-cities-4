import React from 'react';
import Header from '../header/header.jsx';
import {pageTypes} from '../../types/types.js';

const Page = ({className, authorizationStatus, userData, isLoading, isMain, children}) => {
  return (
    <div className={`page${className ? ` ${className}` : ``}`}>
      <Header authorizationStatus={authorizationStatus} userData={userData} isMain={isMain} />
      {isLoading ? <p>Loading...</p> : children}
    </div>
  );
};

Page.defaultProps = {
  className: ``,
  isMain: false,
};

Page.propTypes = pageTypes;

export default Page;
