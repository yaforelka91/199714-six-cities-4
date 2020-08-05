export default interface Offer {
  city: {
    name: string;
    coords: [number, number];
    zoom: number;
  },
  id: number;
  offerZoom: number;
  coords: [number, number];
  title: string;
  description: Array<string>;
  picture: string;
  pictures: Array<string>;
  price: number;
  type: string;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  guests: number;
  services: Array<string>;
  host: {
    id: number;
    name: string;
    picture: string;
    isSuper: boolean;
  };
}