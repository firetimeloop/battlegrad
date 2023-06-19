import 'styled-components';

declare const __SERVER_PORT__: number;

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      background: {
        light: string;
        dark: string;
        primary: string;
        secondary: string;
        lightBlue: string;
        blue: string;
        orange: string;
        green: string;
        black: string;
      };
      text: {
        primary: string;
        secondary: string;
        link: string;
      };
      white: string;
    };
    border: string;
    boxShadow: string;
  }
}
