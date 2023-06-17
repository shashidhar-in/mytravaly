import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalContextProvider from './GlobalContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import PropertyDetails from './components/PropertyDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path="/search-results" element={<SearchResults/>} />
        <Route path="/property-details/:id" element={<PropertyDetails/>} />
      </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
