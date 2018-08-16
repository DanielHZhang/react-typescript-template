import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  test: (state = {}, action: any) => state,
});

export default rootReducer;
