import {combineReducers} from 'redux';
import {testReducer} from 'client/reducers/test';

export type RootState = {
  test: ReturnType<typeof testReducer>;
};

const rootReducer = combineReducers({
  test: testReducer,
});

export default rootReducer;
