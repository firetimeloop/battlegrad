import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  color: {
    background: {
      primary: '#000000',
      secondary: '#FFFFFF',
      light: 'gray',
      dark: 'black',
      lightBlue: '#0882FF',
      blue: 'black',
      orange: '#FF5931',
      green: '#58E07E',
      black: '#1E1E1E',
    },
    text: {
      primary: 'blue',
      secondary: 'green',
      link: 'yellow',
    },
    white: '#FFFFFF',
  },
  border: `1px solid ${'#9F9F9F'}`,
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.14)',
};

export const invertTheme: DefaultTheme = {
  color: {
    background: {
      lightBlue: '#0882FF',
      blue: '#3369F3',
      orange: '#FF5931',
      green: '#58E07E',
      black: '#1E1E1E',
    },
    text: {
      primary: '#1E1E1E',
      secondary: '#C0C5D9',
      link: '#3369F3',
    },
    white: '#FFFFFF',
  },
  border: `1px solid ${'#9F9F9F'}`,
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.14)',
};
