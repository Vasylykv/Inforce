import React, { useState } from 'react';
import { IProduct } from '../../models/IProduct';

interface EditProductModalProps {
  product: IProduct;
  onSave: (updatedProduct: IProduct) => void;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(product.name);
  const [count, setCount] = useState(product.count);

  const handleSave = () => {
    const updatedProduct: IProduct = {
      ...product,
      name: name,
      count: count,
    };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProductModal;
