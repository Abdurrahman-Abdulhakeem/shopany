import { CartAction } from "../components/Addcart";
import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import {
  cartState,
  deleteCartItem,
  getCarts,
  openModal,
  emptyCart,
  incrementCartItem,
  decrementCartItem
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

function Cart() {
  const dispatch = useDispatch();
  const { carts, totalPrice, isModalOpen, loading } = useSelector(cartState);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  return (
    <Base>
      <main className="dashboard">
        <div className="cart">
          <Hamburger />
          <h1>My shopping Cart</h1>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                  <th>Price</th>
                </tr>
              </thead>
              {loading ? (
                <Loader />
              ) : (
                carts?.map((cart) => (
                  <tbody key={cart.cartId} className="tbody">
                    <td>
                      <img src={cart.cartImage} alt={cart.cartName} />
                    </td>

                    <td>
                      {cart.cartName}{" "}
                      <span style={{ marginLeft: "6px" }}>
                        {" "}
                        X{cart.quantity}
                      </span>
                    </td>
                    <td>
                      <CartAction
                        dataId={cart.cartId}
                        dataQuantity={cart.quantity}
                        incAction = {incrementCartItem}
                        decAction = {decrementCartItem}
                      />
                    </td>
                    <td
                      style={{ color: "rgb(123, 104, 238)", fontSize: "25px" }}
                    >
                      <span
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(deleteCartItem(cart.cartId))}
                      >
                        <AiTwotoneDelete />
                      </span>
                    </td>
                    <td>${cart.amount.toFixed(2)}</td>
                  </tbody>
                ))
              )}
            </table>
          </div>

          <div className="overview">
            <span>
              <p className="view">
                Delivery <span style={{ marginLeft: "15px" }}>$0.00</span>
              </p>
            </span>
            <span>
              <p className="view">
                Sub total{" "}
                <span style={{ marginLeft: "15px" }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </span>
            <span>
              <p className="view">
                Total{" "}
                <span style={{ marginLeft: "15px" }}>
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </span>

            {carts.length > 0 && (
              <span>
                <p
                  className=" btn"
                  role="button"
                  onClick={() => dispatch(openModal())}
                >
                  Clear cart
                </p>
              </span>
            )}

            {isModalOpen && (
              <Modal text ="Are you sure you want to clear the cart?">
                  <button className="btn" onClick={() => dispatch(emptyCart())}>
                    Yes
                  </button>
          
              </Modal>
            )}
          </div>

          <div className="checkout">
            <button className="btn">
              <Link to="/dashboard">Continue shopping</Link>
            </button>
            <input type="submit" value="Checkout" className="btn" />
          </div>
        </div>
      </main>
    </Base>
  );
}

export default Cart;
