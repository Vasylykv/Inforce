import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useFormik } from 'formik';
import { IProduct } from '../../models/IProduct';
import { useAppSelector } from '../../hooks/redux';

import './AddProductModal.scss';

import Button from 'react-bootstrap/Button';

interface FormikValues {
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: [];
}

interface AddProductModalProps {
  onSave: (product: IProduct) => void;
  onClose: () => void;
  active: boolean;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  onSave,
  onClose,
  active,
}) => {
  const { products } = useAppSelector((state) => state.product);

  const formik = useFormik<FormikValues>({
    initialValues: {
      name: '',
      imageUrl: '',
      count: 0,
      size: {
        width: 0,
        height: 0,
      },
      weight: '',
      comments: [],
    },
    onSubmit: (values) => {
      const product: IProduct = {
        id: generateId(),
        ...values,
      };
      onSave(product);
    },
  });

  function generateId() {
    return products[products.length - 1].id + 1;
  }

  return (
    <Modal active={active} setActive={onClose}>
      <form onSubmit={formik.handleSubmit} className="add-form">
        <div>
          <label htmlFor="firstName">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div>
          <label htmlFor="lastName">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.imageUrl}
          />
        </div>

        <div>
          <label htmlFor="email">Count</label>
          <input
            id="count"
            name="count"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.count}
          />
        </div>

        <div>
          <label htmlFor="email">Height</label>
          <input
            name="size.height"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.size.height}
          />
        </div>

        <div>
          <label htmlFor="email">Width</label>
          <input
            id="width"
            name="size.width"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.size.width}
          />
        </div>

        <div>
          <label htmlFor="email">Weight</label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.weight}
          />
        </div>

        <Button type="submit">Delete</Button>
      </form>
    </Modal>
  );
};

export default AddProductModal;
