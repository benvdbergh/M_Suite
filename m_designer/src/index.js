import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LayoutProvider } from './contexts/LayoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <LayoutProvider>
          <App />
        </LayoutProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

