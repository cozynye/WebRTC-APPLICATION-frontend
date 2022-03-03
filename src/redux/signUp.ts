const CHANGE_INPUT = 'signUp/CHANGE_INPUT';
const CHANGE_OUTPUT = 'signUp/CHANGE_OUTPUT';

export const setInput = (input: string) => ({
  type: CHANGE_INPUT,
  payload: input,
});

export const setOutput = (output: string) => ({
  type: CHANGE_OUTPUT,
  payload: output,
});

type ChangeExamples =
  | ReturnType<typeof setInput>
  | ReturnType<typeof setOutput>;

interface SignUpState {
  input: string;
  output: string;
}

const INITIAL_SIGNUP_STATE: SignUpState = {
  input: '',
  output: '',
};

function signUpReducer(
  state: SignUpState = INITIAL_SIGNUP_STATE,
  action: ChangeExamples,
) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {...state, input: action.payload};
    case CHANGE_OUTPUT:
      return {...state, output: action.payload};
    default:
      return state;
  }
}

export default signUpReducer;
