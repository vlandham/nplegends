import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as parks } from './parks';
import { reducer as symbols } from './symbols';
import { reducer as search } from './search';
import { reducer as maps } from './maps';

export default combineReducers({
  parks,
  search,
  symbols,
  maps,
  routing: routerReducer,
});
