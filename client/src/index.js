import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LoyaltyProvider} from './context/LoyaltyContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoyaltyProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  // </LoyaltyProvider>
);

reportWebVitals();
