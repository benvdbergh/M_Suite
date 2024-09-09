import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LayoutProvider } from './contexts/LayoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();

