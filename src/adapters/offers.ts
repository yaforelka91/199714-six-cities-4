import Offer from '../interfaces/offer';

const adaptOffer = (offer): Offer => ({
  city: {
    name: offer.city.name,
    coords: [offer.city.location.latitude, offer.city.location.longitude],
    zoom: offer.city.location.zoom,
  },
  id: offer.id,
  coords: [offer.location.latitude, offer.location.longitude],
  offerZoom: offer.location.zoom,
  title: offer.title,
  description: [offer.description],
  picture: offer.preview_image,
  pictures: offer.images,
  price: offer.price,
  type: offer.type,
  isPremium: offer.is_premium,
  isFavorite: offer.is_favorite,
  rating: offer.rating,
  bedrooms: offer.bedrooms,
  guests: offer.max_adults,
  services: offer.goods,
  host: {
    id: offer.host.id,
    name: offer.host.name,
    picture: offer.host.avatar_url,
    isSuper: offer.host.is_pro,
  },
});

export default adaptOffer;
