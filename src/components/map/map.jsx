import React, {PureComponent, createRef} from 'react';
import leaflet from 'leaflet';
import {mapTypes} from '../../types/types.js';

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [27, 39]
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._mapObject = null;
    this._markers = [];
    this._zoom = 12;
  }

  componentDidMount() {
    this._renderMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeCity !== this.props.activeCity) {
      this._mapObject.setView(this.props.activeCity, this._zoom);
    }

    this._clearMarkers();
    this._renderMarkers();
  }

  componentWillUnmount() {
    this._mapObject.remove();
    this._mapObject = null;
  }

  _renderMap() {
    const mapElement = this._mapRef.current;

    if (!mapElement) {
      return;
    }

    if (this._mapObject) {
      this._mapObject.remove();
    }

    const {activeCity} = this.props;

    this._mapObject = leaflet.map(mapElement, {
      center: activeCity,
      zoom: this._zoom,
      zoomControl: false,
      marker: true
    });

    this._mapObject.setView(activeCity, this._zoom);

    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this._mapObject);

    this._renderMarkers();
  }

  _clearMarkers() {
    this._markers.forEach(({marker}) => marker.remove());
    this._markers = [];
  }

  _renderMarkers() {
    const {offers, activeCard} = this.props;
    offers.forEach(({offerId, coords}) => {
      const marker = leaflet
        .marker(coords, {
          icon: offerId === activeCard ? ICON_ACTIVE : ICON,
        })
        .addTo(this._mapObject);
      this._markers.push({offerId, marker});
    });
  }

  render() {
    return (
      <div ref={this._mapRef} style={{height: `100%`}}></div>
    );
  }
}

Map.defaultProps = {
  activeCard: -1,
};

Map.propTypes = mapTypes;

export default Map;
