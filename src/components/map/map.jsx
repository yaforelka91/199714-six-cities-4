import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

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

    const {offers, activeCity} = this.props;

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

    offers.forEach((offer) => {
      leaflet
        .marker(offer.coords, {icon})
        .addTo(this.mapObject);
    });

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

  render() {
    return (
      <div ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coords: PropTypes.arrayOf(PropTypes.number.isRequired),
      }).isRequired
  ).isRequired,
  activeCity: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Map;
