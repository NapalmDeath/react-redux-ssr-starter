import update from 'immutability-helper';

export const LOAD_SUCCESS = 'LOAD_SUCCESS';

export const load = () => dispatch => {
  console.log('FAKE API CALL!!!');

  return new Promise(
    resolve =>
      setTimeout(() => {
        resolve(
          dispatch({
            type: LOAD_SUCCESS,
            payload: [{ _id: 1, text: 'text 1' }, { _id: 2, text: 'text 2' }]
          })
        );
      }),
    500
  );
};

const initialState = {
  data: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return update(state, { data: { $set: action.payload } });

    default:
      return state;
  }
};

export default reducer;
