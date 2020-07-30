import React from 'react';
import {cityListItemTypes} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const CityListItem = ({city, onCityNameClick, classNameLink}) => {
  return (
    <li className="locations__item">
      <Link
        className={`locations__item-link${classNameLink ? ` ${classNameLink}` : ``}`}
        to={AppRoute.ROOT}
        onClick={onCityNameClick}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
};

CityListItem.defaultProps = {
  classNameLink: ``,
  onCityNameClick: () => {},
};

CityListItem.propTypes = cityListItemTypes;

export default CityListItem;
