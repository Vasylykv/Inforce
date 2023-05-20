import React, { useState, useEffect } from 'react';
import { IProduct } from '../../models/IProduct';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
} from '../../store/actions/ProductActions';

import { fetchComments } from '../../store/actions/CommentActions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Modal from '../Modal/Modal';
import ProductItem from '../ProductItem/ProductItem';
import AddProductModal from '../AddProductModal/AddProductModal';
import Button from 'react-bootstrap/Button';

import './ProductList.scss';

const ProductListView: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading, error } = useAppSelector(
    (state) => state.product
  );

  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchComments());
  }, []);

  const handleAddProduct = (newProduct: IProduct) => {
    dispatch(addProduct(newProduct));
    setIsAdding(false);
  };

  const handleDeleteProduct = (productId: number) => {
    setSelectedProductId(productId);
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId));
      // dispatch(deleteComment(selectedProductId)); // Delete associated comments
      setSelectedProductId(null);
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedProductId(null);
    setIsDeleting(false);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Product List</h1>

      <Button
        variant="primary"
        onClick={() => setIsAdding(true)}
        className="add-product-btn"
      >
        Add Product
      </Button>

      {isAdding && (
        <AddProductModal
          active={isAdding}
          onSave={handleAddProduct}
          onClose={() => setIsAdding(false)}
        />
      )}

      <div className="product-list">
        {products.map((product: IProduct) => {
          return (
            <ProductItem
              product={product}
              key={product.id}
              setIsDeleting={setIsDeleting}
              setSelectedProductId={setSelectedProductId}
            />
          );
        })}
      </div>

      {isDeleting && (
        <Modal active={isDeleting} setActive={setIsDeleting}>
          <p>Are you sure you want to delete this product?</p>
          <div className="button-group">
            <Button variant="danger" onClick={handleConfirmDelete}>
              Confirm
            </Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductListView;
