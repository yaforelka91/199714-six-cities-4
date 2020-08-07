import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as catalog} from './catalog/catalog';
import {reducer as user} from './user/user';
import {reducer as favorites} from './favorites/favorites';
import {reducer as reviews} from './reviews/reviews';

import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CATALOG]: catalog,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITES]: favorites,
  [NameSpace.REVIEWS]: reviews,
});
