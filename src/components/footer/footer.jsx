import React from 'react';
import {Link} from 'react-router-dom';
import {footerTypes} from '../../types/types.js';
import {AppRoute} from '../../const';

const Footer = () => {
  return (
    <footer className="footer">
      <Link className="footer__logo-link" to={AppRoute.ROOT}>
        <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
};

Footer.propTypes = footerTypes;

export default Footer;
