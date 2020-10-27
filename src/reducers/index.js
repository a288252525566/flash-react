import { combineReducers } from 'redux';
import list from 'reducers/list';
import errMessages from 'reducers/errMessages';


const app = combineReducers({
  list,
  errMessages
})

export default app;

