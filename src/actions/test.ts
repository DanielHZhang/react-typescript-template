
export const testAction = () => async (dispatch: any) => {
  dispatch({type: 'stuff', payload: ''});
};

export const testAction2 = () => ({type: 'stuff', payload: ''});
