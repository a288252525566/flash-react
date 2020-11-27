import { combineReducers } from 'redux';
import list from 'reducers/list';
import errMessages from 'reducers/errMessages';
import ui from 'reducers/ui';


const app = combineReducers({
  list,
  errMessages,
  ui
})

export default app;

