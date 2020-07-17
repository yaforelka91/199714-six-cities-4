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

const ZOOM = 12;

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._mapObject = null;
    this._markers = [];
  }

  componentDidMount() {
    this._renderMap();
  }

  componentDidUpdate() {
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

    this._mapObject = leaflet.map(mapElement, {
      center: [0, 0],
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

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

    let minlat = 200; let minlon = 200; let maxlat = -200; let maxlon = -200;

    offers.forEach(({id, coords}) => {
      if (minlat > coords[0]) {
        minlat = coords[0];
      }
      if (minlon > coords[1]) {
        minlon = coords[1];
      }
      if (maxlat < coords[0]) {
        maxlat = coords[0];
      }
      if (maxlon < coords[1]) {
        maxlon = coords[1];
      }

      const marker = leaflet
        .marker(coords, {
          icon: id === activeCard ? ICON_ACTIVE : ICON,
        })
        .addTo(this._mapObject);
      this._markers.push({id, marker});
    });

    const c1 = leaflet.latLng(minlat, minlon);
    const c2 = leaflet.latLng(maxlat, maxlon);

    this._mapObject.fitBounds(leaflet.latLngBounds(c1, c2), {padding: [20, 20]});
  }

  render() {
    const {className} = this.props;

    return (
      <section className={`${className ? `${className} ` : ``}map`}>
        <div ref={this._mapRef} style={{height: `100%`}}></div>
      </section>
    );
  }
}

Map.defaultProps = {
  activeCard: -1,
  className: ``,
};

Map.propTypes = mapTypes;

export default Map;
