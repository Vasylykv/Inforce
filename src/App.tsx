import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { productSlice } from './store/reducers/ProductSlice';
import { fetchProducts } from './store/actions/ProductActions';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './components/ProductDetails/ProductDetails';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
