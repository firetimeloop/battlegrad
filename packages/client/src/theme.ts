import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  name: 'darkTheme',
  colors: {
    primary: '#000000',
    primaryVariant: '#000000',
    secondary: '#FFFFFF',
    secondaryVariant: '#FFFFFF',
    accent: '#8f492e',
    accentVariant: '#FF5931',
    background: '#000000',
    surface: '#FFFFFF',
    error: 'red',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onAccent: '#000000',
    onBackground: '#FFFFFF',
    onSurface: '#000000',
    onError: '#FFFFFF',
    commentHighlight: 'rgba(255,255,255,.3)',
  },
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.14)',
};

export const lightTheme: DefaultTheme = {
  name: 'lightTheme',
  colors: {
    primary: '#FFFFFF',
    primaryVariant: '#000000',
    secondary: '#000000',
    secondaryVariant: '#FFFFFF',
    accent: '#8f492e',
    accentVariant: '#FF5931',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: 'red',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onAccent: '#FFFFFF',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#FFFFFF',
    commentHighlight: 'rgba(0,0,0,.3)',
  },
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.14)',
};
