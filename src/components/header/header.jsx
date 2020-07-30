import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import {headerTypes} from '../../types/types.js';
import {AppRoute} from '../../const';
import {connect} from 'react-redux';
import {getAuthorizationStatus, getUserData} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/favorites/favorites';

const Header = ({authorizationStatus, userData, onFavoriteRequest}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {useLocation().pathname === AppRoute.ROOT ?
              <span className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </span> :
              <Link className="header__logo-link" to={AppRoute.ROOT}>
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            }
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  className="header__nav-link header__nav-link--profile"
                  to={authorizationStatus === AuthorizationStatus.NO_AUTH ? AppRoute.LOGIN : AppRoute.FAVORITES}
                  onClick={() => {
                    if (authorizationStatus === AuthorizationStatus.AUTH) {
                      onFavoriteRequest();
                    }
                  }}
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                  >
                    {authorizationStatus === AuthorizationStatus.AUTH && <img src={`https://htmlacademy-react-3.appspot.com/six-cities${userData.picture}`} alt="User avatar" />}
                  </div>
                  {authorizationStatus === AuthorizationStatus.AUTH && <span className="header__user-name user__name">{userData.email}</span>}
                  {authorizationStatus === AuthorizationStatus.NO_AUTH && <span className="header__login">Sign in</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = headerTypes;

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userData: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteRequest() {
    dispatch(Operation.loadFavorites());
  },
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
