import {produce} from 'immer';

type State = {
  status: string;
};

const initial: State = {
  status: 'requested',
};
type ActionType = {
  type: string;
  payload: any;
};

export const testReducer = (state = initial, action: ActionType) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SOME CHANGE': {
        return;
      }
      case 'THIS ACTION TYPE RESETS': {
        return initial;
      }
      default: {
        return;
      }
    }
  });
};
