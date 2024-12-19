import tinyColor from 'tinycolor2';

export const purple = {
  50: '#FAF6FF',
  100: '#eee5ff',
  200: '#DEC4FF',
  300: '#CAA6FF',
  400: '#BA90FF',
  500: '#9E6CFF',
  600: '#794EDB',
  700: '#5936B7',
  800: '#3D2293',
  900: '#29147A',
  1000: '#130532',
};
export const blue = {
  50: '#F4FAFF',
  100: '#EAF4FD',
  200: '#D5E9FC',
  300: '#BED9F8',
  400: '#ABC9F2',
  500: '#8FB2EA',
  600: '#6889C9',
  700: '#4865A8',
  800: '#2D4587',
  900: '#1B2E70',
  1000: '#131F3F',
};
export const red = {
  100: '#FEE8E7',
  200: '#FDDCDA',
  300: '#FCCBC8',
  400: '#FAA9A3',
  500: '#F8877F',
  600: '#F6655A',
  700: '#F44336',
  800: '#C8372D',
  900: '#9C2B23',
};
export const orange = {
  100: '#FFEFDE',
  200: '#FEE8D0',
  300: '#FDDCB9',
  400: '#FFCC95',
  500: '#FCAF5C',
  600: '#FB982E',
  700: '#FB8200',
  800: '#CE6B00',
  900: '#A05300',
};
export const yellow = {
  100: '#FFF9D5',
  200: '#FFF1AB',
  300: '#FFE781',
  400: '#FFDD62',
  500: '#FFCD2E',
  600: '#DBAA21',
  700: '#B78917',
  800: '#936A0E',
  900: '#7A5308',
};

export const green = {
  100: '#ebf6ee',
  200: '#d6eedd',
  300: '#61EB6F',
  400: '#34D244',
  500: '#268E42',
  600: tinyColor('#268E42').darken(5).toString(),
};

export const error = {
  100: '#ffeded',
  200: '#fadadb',
  300: '#E6454D',
};

export const shades = {
  100: '#ffffff',
  200: '#f7f7f7',
  300: '#f5f5f5',
  400: '#f1f1f1',
  500: '#dddddd',
};

export const grey = {
  100: '#E4E4E4',
  200: '#B0B0B0',
  300: '#A7A7A7',
  400: '#6F6F6F',
};

export const dark = {
  100: '#3B3B3B',
  200: '#0A0C10',
};

export const text = {
  heading: blue[1000],
  body: grey[400],
  error: error[300],
  success: green[500],
  warning: orange[700],
  white: '#ffffff',
};
