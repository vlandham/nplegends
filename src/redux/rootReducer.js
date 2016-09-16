import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducer as parks } from './parks';
import { reducer as symbols } from './symbols';
import { reducer as search } from './search';
import { reducer as maps } from './maps';
import { reducer as parkPage } from './parkPage';

export default combineReducers({
  parks,
  search,
  symbols,
  maps,
  parkPage,
  routing: routerReducer,
});
