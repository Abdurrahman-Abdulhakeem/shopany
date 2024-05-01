import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, cartState, deleteCartItem } from "../redux/cartSlice";
import MiniSpinner from "./MiniSpinner";

function Addcart({ children, product }) {
  const dispatch = useDispatch();
  const {carts} = useSelector(cartState)

  const cart = carts.some(cart => cart.cartId === product.productId)

  const handleAddProduct = (product) => {
    const data = {
      cartId: product.productId,
      cartImage: product.productImage,
      cartName: product.productName,
      quantity: product.quantity,
      price: product.price,
      amount: product.price * product.quantity
    }

    !cart && dispatch(addProductToCart(data))
   
  }

 


  return (
    <div className="flex blk-md">
      {children}

      {cart && <button className="btn" onClick={() => dispatch(deleteCartItem(product.productId))}>
        {"Remove from cart"}
        
      </button>}

      {!cart && <button className="btn" onClick={() => handleAddProduct(product)}>
        { "Add to cart"}
        
      </button>}
    </div>
  );
}

export function CartAction({ dataId, dataQuantity, incAction, decAction }) {
  const dispatch = useDispatch();
  return (
    <div className="inc">
      <span
        role="button"
        className="plus"
        onClick={() => dispatch(incAction(dataId))}
      >
        +
      </span>
      <span className="quantity">{dataQuantity}</span>
      <span
        role="button"
        className="minus"
        onClick={() => dispatch(decAction(dataId))}
      >
        &minus;
      </span>
    </div>
  );
}

export default Addcart;
