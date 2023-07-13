import 'styled-components';

declare global {
  declare const __SERVER_PORT__: number;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      primaryVariant: string;
      secondary: string;
      secondaryVariant: string;
      accent: string;
      accentVariant: string;
      background: string;
      surface: string;
      error: string;
      onPrimary: string;
      onSecondary: string;
      onAccent: string;
      onBackground: string;
      onSurface: string;
      onError: string;
      commentHighlight: string;
    };
    boxShadow: string;
  }
}
