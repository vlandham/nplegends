import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as parks } from './parks';
import { reducer as symbols } from './symbols';
import { reducer as globalSearch } from './globalSearch';

export default combineReducers({
  parks,
  globalSearch,
  symbols,
  routing: routerReducer,
});
