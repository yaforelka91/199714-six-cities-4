import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();

    this.state = {
      currentCoords: [52.38333, 4.9],
      zoom: 12,
    };
  }

  componentDidMount() {
    const mapElement = this._mapRef.current;
    const {offers} = this.props;
    const mapObject = leaflet.map(mapElement, {
      center: this.state.currentCoords,
      zoom: this.state.zoom,
      zoomControl: false,
      marker: true
    });

    mapObject.setView(this.state.currentCoords, this.state.zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
      .addTo(mapObject);

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });

    offers.forEach((offer) => {
      leaflet
      .marker(offer.coords, {icon})
      .addTo(mapObject);
    });
  }

  componentWillUnmount() {
    const mapElement = this._mapRef.current;
    mapElement.remove();
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
};

export default Map;
