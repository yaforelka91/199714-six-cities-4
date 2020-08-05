export const MONTHS_LIST = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

export enum AppRoute {
  FAVORITES = `/favorites`,
  LOGIN = `/login`,
  OFFER = `/offer`,
  ROOT = `/`
};

export enum CardView {
  CITIES = `cities`,
  NEAR = `near`,
  FAVORITES = `favorites`
};

export const IconConfig = {
  WIDTH: 27,
  HEIGHT: 39,
  REGULAR_URL: `/img/pin.svg`,
  ACTIVE_URL: `/img/pin-active.svg`,
};

export enum SortType {
  POPULAR = `popular`,
  TO_HIGH = `to-high`,
  TO_LOW = `to-low`,
  TOP_RATED = `top-rated`
};