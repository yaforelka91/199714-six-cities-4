import React, {Fragment, PureComponent} from 'react';
import {connect} from 'react-redux';
import {favoritesTypes} from '../../types/types.js';
import CityListItem from '../city-list-item/city-list-item.jsx';
import OfferList from '../offer-list/offer-list.jsx';
import {CardView} from '../../const.js';
import {ActionCreator} from '../../reducer/catalog/catalog.js';
import {Operation} from '../../reducer/favorites/favorites.js';
import {getGroupedFavoriteOffers} from '../../reducer/favorites/selectors.js';

class Favorites extends PureComponent {
  componentDidMount() {
    this.props.onFavoritesRequest();
  }

  render() {
    const {offers, onCityNameClick} = this.props;

    return (
      <main className={`page__main page__main--favorites${offers.length === 0 ? ` page__main--favorites-empty` : ``}`}>
        <div className="page__favorites-container container">
          <section className={`favorites${offers.length === 0 ? ` favorites--empty` : ``}`}>
            {offers.length === 0 ?
              <Fragment>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
                </div>
              </Fragment> :
              <Fragment>
                <h1 className="favorites__title">Saved listing</h1>
                <ul className='favorites__list'>
                  {
                    offers.map((localOffer) => {
                      const currentCity = Object.keys(localOffer)[0];

                      return (
                        <li className='favorites__locations-items' key={currentCity}>
                          <div className="favorites__locations locations locations--current">
                            <CityListItem
                              tagName='div'
                              city={currentCity}
                              onCityNameClick={() => onCityNameClick(currentCity)}
                            />
                          </div>
                          <OfferList
                            offers={localOffer[currentCity]}
                            className='favorites__places'
                            viewMode={CardView.FAVORITES}
                          />
                        </li>
                      );
                    })
                  }
                </ul>
              </Fragment>
            }
          </section>
        </div>
      </main>
    );
  }
}

Favorites.propTypes = favoritesTypes;

const mapStateToProps = (state) => ({
  offers: getGroupedFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityNameClick(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onFavoritesRequest() {
    dispatch(Operation.loadFavorites());
  }
});

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
