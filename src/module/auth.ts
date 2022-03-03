export const SET_TOEKN = 'TOKEN';

export function userLogin(data: string) {
  return {
    type: SET_TOEKN,
    payload: data,
  };
}

const initialState: {
  token: string | null;
} = {
  token: null,
};

export default function auth(
  state = initialState,
  action: {type: string; payload: string},
) {
  switch (action.type) {
    case SET_TOEKN:
      return {...state, token: action.payload};
    default:
      return state;
  }
}
