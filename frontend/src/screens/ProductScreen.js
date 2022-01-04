import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push(`/cart`);
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
















// import './ProductScreen.css'
// const ProductScreen = () => {
//     return <div className='productScreen'>
            

//             <div className='productscreen__left'>
//                 <div className='left__image'>
//                     {/* <img src='https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' alt='product name'/> */}
//                     <img src='https://images.unsplash.com/photo-1556448851-9359658faa54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' alt='product name'/>

//                 </div>

//                 <div className='left__info'>
//                     <p className='left__name'>Product 1</p>
//                     <p>Price: $499</p>
//                     <p>Description: lorelllleeeeeeeeeemmmmmmmmmmmmmmmmmmmmmmmmmmmmeeeeeeeeelllllllllmmmmmmmmmmmmmmm</p>

//                 </div>

//             </div>

//             <div className='productscreen__right'>
//                 <div className='right__info'>
//                     <p>
//                         price: <span>$499</span>

//                     </p>

//                     <p>
//                         status: <span>In stock</span>
//                     </p>
//                     <p>
//                         Qty
//                         <select>
//                             <option value = '1'>1</option>
//                             <option value = '2'>2</option>
//                             <option value = '3'>3</option>
//                             <option value = '4'>4</option>
//                             <option value = '5'>5</option>
//                             <option value = '6'>6</option>
//                         </select>
//                     </p>

//                     <p>
//                         <button type='button' > Add to cart</button>
//                     </p>


//                 </div>
//             </div>


//         </div>
    
// };

// export default ProductScreen
