import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../types';
import {noOperation} from '../../utils';

type Props = {
  city: string;
  classNameLink?: string;
  tagName?: keyof JSX.IntrinsicElements;
  onCityNameClick?: () => void;
};

const CityListItem: React.FC<Props & React.HTMLAttributes<HTMLOrSVGElement>> = (props: Props) => {
  const {
    city,
    classNameLink = ``,
    tagName: TagName = `li`,
    onCityNameClick = noOperation,
  } = props;

  return (
    <TagName className="locations__item">
      <Link
        className={`locations__item-link${classNameLink ? ` ${classNameLink}` : ``}`}
        to={AppRoute.ROOT}
        onClick={onCityNameClick}
      >
        <span>{city}</span>
      </Link>
    </TagName>
  );
};

export default CityListItem;
