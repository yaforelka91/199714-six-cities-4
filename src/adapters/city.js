const adaptCity = (city) => {
  return {
    name: city.name,
    coords: [city.location.latitude, city.location.longitude],
    zoom: city.location.zoom,
  };
};

export default adaptCity;
