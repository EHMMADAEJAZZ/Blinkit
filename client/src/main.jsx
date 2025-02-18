import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.jsx';
import {Provider} from "react-redux"
import store from './app/store.js';
import { GlobalProvider } from './context/globalContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
    <GlobalProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </GlobalProvider>
      </Provider>
  </StrictMode>
);
