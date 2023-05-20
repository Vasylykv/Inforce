import { IProduct } from '../../models/IProduct';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

interface IProductItem {
  product: IProduct;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProductId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProductItem: React.FC<IProductItem> = ({
  product,
  setIsDeleting,
  setSelectedProductId,
}) => {
  const handleDelete = () => {
    setSelectedProductId(product.id);
    setIsDeleting(true);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={product.imageUrl}
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text>Here could be your advertising!</Card.Text>
        <Button onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
