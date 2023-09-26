import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter,Has } from 'react-router-dom';
import App from './App';
import './App.css'
import LocationContextProvider from './Hooks/LocationContextProvider';
import MediaQueryContextProvider from './Hooks/MediaQueryContextProvider';
import { store } from './store/store';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
      <Provider store={store}>
          <MediaQueryContextProvider>
              <LocationContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App/>
              </LocalizationProvider>
              </LocationContextProvider>
          </MediaQueryContextProvider>
      </Provider>
  </HashRouter>
);

