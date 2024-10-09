import { createTheme } from '@mui/material/styles';

const commonSettings = {
  palette: {
    primary: {
      main: '#ff5722', // Accent color
    },
  },
  shape: {
    borderRadius: 8,
  },
};

const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    ...commonSettings.palette,
    mode: 'light',
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',     // Set default size to 'small'
        margin: 'dense',
      },
    },
  },
});


const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    ...commonSettings.palette,
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',     // Set default size to 'small'
        margin: 'dense',
      },
    },
  },
});

export { lightTheme, darkTheme };
