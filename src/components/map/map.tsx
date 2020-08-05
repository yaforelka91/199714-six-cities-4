import * as React from 'react';
import {
  icon,
  map,
  featureGroup,
  tileLayer,
  marker as leafletMarker,
  Map as LeafletMap,
  Marker
} from 'leaflet';
import {IconConfig} from '../../const';

const ICON = icon({
  iconUrl: IconConfig.REGULAR_URL,
  iconSize: [IconConfig.WIDTH, IconConfig.HEIGHT]
});

const ICON_ACTIVE = icon({
  iconUrl: IconConfig.ACTIVE_URL,
  iconSize: [IconConfig.WIDTH, IconConfig.HEIGHT]
});

type Props = {
  city: [number, number];
  zoom: number;
  offers: {
    id: number;
    coords: [number, number];
  }[];
  activeCard?: number;
  className?: string;
};

class Map extends React.Component<Props, {}> {
  props: Props;
  private mapRef: React.RefObject<HTMLDivElement>;
  private markers: {id: number; marker: Marker}[];
  private mapObject: LeafletMap;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.mapObject = null;
    this.markers = [];
  }

  componentDidMount() {
    this._renderMap();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.offers.some((offer, index) => offer.id !== this.props.offers[index].id) || nextProps.activeCard !== this.props.activeCard;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offers.some((offer, index) => offer.id !== this.props.offers[index].id)) {
      this._clearMarkers();
      this._renderMarkers();
    }

    if (prevProps.offers.every((offer, index) => offer.id === this.props.offers[index].id) && prevProps.activeCard !== this.props.activeCard) {
      this._updateMarkers(this.props.activeCard, prevProps.activeCard);
    }
  }

  componentWillUnmount() {
    this._clearMarkers();
    this.mapObject.remove();
    this.mapObject = null;
  }

  _renderMap() {
    const mapElement = this.mapRef.current;

    if (!mapElement) {
      return;
    }

    if (this.mapObject) {
      this.mapObject.remove();
    }

    const {city, zoom} = this.props;
    this.mapObject = map(mapElement, {
      center: city,
      zoom,
      zoomControl: false,
    });

    tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this.mapObject);

    this._renderMarkers();
  }

  _updateMarkers(newMarkId: number, oldMarkId: number) {
    const oldMark = this.markers.find((marker) => marker.id === oldMarkId);
    const activeMark = this.markers.find((marker) => marker.id === newMarkId);

    if (activeMark) {
      activeMark.marker.setIcon(ICON_ACTIVE);
    }

    if (oldMark) {
      oldMark.marker.setIcon(ICON);
    }
  }

  _clearMarkers() {
    this.markers.forEach(({marker}) => marker.remove());
    this.markers = [];
  }

  _renderMarkers() {
    const {offers, activeCard = -1} = this.props;

    offers.forEach(({id, coords}) => {
      const marker = leafletMarker(coords, {
        icon: id === activeCard ? ICON_ACTIVE : ICON,
      });
      this.markers.push({id, marker});
    });

    const markers = this.markers.map(({marker}) => marker);
    const markersGroup = featureGroup(markers).addTo(this.mapObject);
    this.mapObject.fitBounds(
        markersGroup.getBounds(),
        {
          padding: [IconConfig.WIDTH, IconConfig.HEIGHT],
        }
    );
  }

  render() {
    const {className = ``} = this.props;
    return (
      <section className={`${className ? `${className} ` : ``}map`}>
        <div ref={this.mapRef} style={{height: `100%`}}></div>
      </section>
    );
  }
}

export default Map;
