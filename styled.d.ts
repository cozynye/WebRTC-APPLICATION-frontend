import 'styled-components';

// styled-components안에 들어있는 DefaultTheme 형식 지정해주기
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      white: string;
      black: string;
      'gray-100': string;
      'gray-200': string;
      'gray-300': string;
      'red-100': string;
      'red-200': string;
    };
    fontSize: {
      heading1: string;
      body: string;
    };
  }
}
