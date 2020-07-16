import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as catalog} from './catalog/catalog.js';
import {reducer as user} from './user/user.js';
import NameSpace from './name-space.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CATALOG]: catalog,
  [NameSpace.USER]: user,
});
