import React, {PureComponent, createRef} from 'react';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {mapTypes} from '../../types/types.js';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

    this.mapObject = null;
  }

  componentDidMount() {
    this._renderMap();
  }

  componentDidUpdate() {
    this._renderMap();
  }

  componentWillUnmount() {
    this.mapObject.remove();
    this.mapObject = null;
  }
  _renderMap() {
    const mapElement = this._mapRef.current;

    if (!mapElement) {
      return;
    }

    if (this.mapObject) {
      this.mapObject.remove();
    }

    const zoom = 12;

    const {offers, activeCity, activeCard} = this.props;

    this.mapObject = leaflet.map(mapElement, {
      center: activeCity,
      zoom,
      zoomControl: false,
      marker: true
    });

    this.mapObject.setView(activeCity, zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
        .addTo(this.mapObject);

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });

    const iconActive = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [27, 39]
    });

    offers.forEach((offer) => {
      leaflet
        .marker(offer.coords, {
          icon: offer.id === activeCard.id ? iconActive : icon,
        })
        .addTo(this.mapObject);
    });
  }

  render() {
    return (
      <div ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = mapTypes;

const mapStateToProps = (state) => {
  return {activeCard: state.activeCard};
};

export {Map};
export default connect(mapStateToProps)(Map);
