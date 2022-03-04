export const SET_TOEKN = 'TOKEN';

export function userLogin(data: string) {
  return {
    type: SET_TOEKN,
    payload: data,
  };
}

type userLoginActionType = ReturnType<typeof userLogin>;

const initialState: {
  token: string | null;
} = {
  token: null,
};

export default function auth(
  state = initialState,
  action: {type: string; payload: userLoginActionType},
) {
  switch (action.type) {
    case SET_TOEKN:
      return {...state, token: action.payload};
    default:
      return state;
  }
}
