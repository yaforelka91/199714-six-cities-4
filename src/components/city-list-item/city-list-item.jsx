import React from 'react';
import {cityListItemTypes} from '../../types/types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const CityListItem = ({city, onCityNameClick, classNameLink, tagName}) => {
  const Tag = tagName;

  return (
    <Tag className="locations__item">
      <Link
        className={`locations__item-link${classNameLink ? ` ${classNameLink}` : ``}`}
        to={AppRoute.ROOT}
        onClick={onCityNameClick}
      >
        <span>{city}</span>
      </Link>
    </Tag>
  );
};

CityListItem.defaultProps = {
  classNameLink: ``,
  tagName: `li`,
  onCityNameClick: () => {},
};

CityListItem.propTypes = cityListItemTypes;

export default CityListItem;
