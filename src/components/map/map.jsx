import React, {PureComponent, createRef} from 'react';
import leaflet from 'leaflet';
import {mapTypes} from '../../types/types.js';
import {IconSizes} from '../../const.js';

const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [IconSizes.WIDTH, IconSizes.HEIGHT]
});

const ICON_ACTIVE = leaflet.icon({
  iconUrl: `/img/pin-active.svg`,
  iconSize: [IconSizes.WIDTH, IconSizes.HEIGHT]
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

  componentDidUpdate(prevProps) {
    if (prevProps.activeCity !== this.props.activeCity) {
      this._clearMarkers();
      this._renderMarkers();
    }

    if (prevProps.activeCard !== this.props.activeCard) {
      this._updateMarkers(this.props.activeCard, prevProps.activeCard);
    }
  }

  componentWillUnmount() {
    this._clearMarkers();
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

  _updateMarkers(newMarkId, oldMarkId) {
    const oldMark = this._markers.find((marker) => marker.id === oldMarkId);
    const activeMark = this._markers.find((marker) => marker.id === newMarkId);

    if (activeMark) {
      activeMark.marker.setIcon(ICON_ACTIVE);
    }

    if (oldMark) {
      oldMark.marker.setIcon(ICON);
    }
  }

  _clearMarkers() {
    this._markers.forEach(({marker}) => marker.remove());
    this._markers = [];
  }

  _renderMarkers() {
    const {offers, activeCard} = this.props;

    offers.forEach(({id, coords}) => {
      const marker = leaflet
        .marker(coords, {
          icon: id === activeCard ? ICON_ACTIVE : ICON,
        });
      this._markers.push({id, marker});
    });

    const markers = this._markers.map(({marker}) => marker);
    const markersGroup = leaflet.featureGroup(markers).addTo(this._mapObject);
    this._mapObject.fitBounds(
        markersGroup.getBounds(),
        {
          padding: [IconSizes.WIDTH, IconSizes.HEIGHT],
        }
    );
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
