import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { IComment } from '../../models/IComment';

import './ProductDetails.scss';

import { deleteComment, addComment } from '../../store/actions/CommentActions';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import getDateString from '../../utils/getDateString';

import CommentItem from '../CommentItem/CommentItem';
import { fetchProducts } from '../../store/actions/ProductActions';
// import EditProductModal from '../EditProductModal/EditProductModal';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');

  const { products, isLoading } = useAppSelector((state) => state.product);
  const product = useAppSelector((state) =>
    state.product.products.find((p) => p.id === parseInt(id!))
  );

  const { comments } = useAppSelector((state) => state.comment);

  const productComments = comments.filter(
    (com) => com.productId === product?.id
  );

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [id]);

  // const [isEditing, setIsEditing] = useState(false);

  // const handleSaveProduct = (updatedProduct: IProduct) => {
  //   // Dispatch action to save the updated product details
  //   console.log(updatedProduct);
  // };

  const handleAddComment = (text: string) => {
    const comment: IComment = {
      id: 1,
      productId: product!.id,
      description: text,
      date: getDateString(),
    };

    dispatch(addComment(comment));
    setComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (!product) {
    return (
      <>
        <p>Product not found</p>
        <Link to="/" className="go-back">
          <Button>Go back</Button>
        </Link>
      </>
    );
  }

  // return (
  //   <div>
  //     {product ? (
  //       <div>
  //         <h1>Product Details</h1>
  //         <p>Name: {product.name}</p>
  //         <p>Count: {product.count}</p>
  //         <button onClick={() => setIsEditing(true)}>Edit</button>
  //         <h2>Comments:</h2>
  //         {product.comments.length > 0 ? (
  //           <ul className="comments-list">
  //             {product.comments.map((comment) => (
  //               <li key={comment.id}>
  //                 <CommentItem
  //                   comment={comment}
  //                   onDelete={() => handleDeleteComment(comment.id)}
  //                 />
  //               </li>
  //             ))}
  //           </ul>
  //         ) : (
  //           <p>No comments available.</p>
  //         )}
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}

  //     {isEditing && (
  //       <EditProductModal
  //         product={product!}
  //         onSave={handleSaveProduct}
  //         onClose={() => setIsEditing(false)}
  //       />
  //     )}
  //   </div>
  // );

  return (
    <div className="product-details">
      <Link to="/" className="go-back">
        <Button>Go back</Button>
      </Link>
      <Card style={{ width: '20rem' }} className="product">
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
          <Card.Title>{product.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Count: {product.count}</ListGroup.Item>
          <ListGroup.Item>Width: {product.size.width}</ListGroup.Item>
          <ListGroup.Item>Height: {product.size.height}</ListGroup.Item>
          <ListGroup.Item>Weight: {product.weight}</ListGroup.Item>
        </ListGroup>
        <Card.Body></Card.Body>
      </Card>
      <ListGroup className="comment-section">
        {productComments.length > 0
          ? productComments.map((comment) => {
              return (
                <CommentItem comment={comment} onDelete={handleDeleteComment} />
              );
            })
          : 'The are no comments to this product'}
      </ListGroup>

      {/* ); */}
      <form className="add-comment">
        <label htmlFor="comment">Add a new comment</label>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="primary" onClick={() => handleAddComment(comment)}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default ProductDetails;
