import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Addcart, { CartAction } from "../components/Addcart";
import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import Loader from "../components/Loader";

import {
  decrementProduct,
  incrementProduct,
  productState,
} from "../redux/productSlice";
import { cartState } from "../redux/cartSlice";

function Dashboard() {
  const { products, loading } = useSelector(productState);
  const { loading: addCartLoading } = useSelector(cartState);

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Base>
      {loading ? (
        <Loader />
      ) : (
        <>
          {addCartLoading && <Loader />}
          <main className="dashboard">
            <div className="flex search">
              <Hamburger />

              <input type="text" placeholder="Search any" />
              <button className="btn" type="submit">
                Search
              </button>
            </div>

            <h1>Welcome Rammy</h1>
            <div className="products">
              <h2>Sneakers</h2>

              <div className="flex wrap">
                {products?.map((product) => (
                  <div className="product" key={product.productId}>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      onClick={() => handleProductClick(product.productId)}
                      className="open-prod-detail"
                    />
                    <div
                      className="flex blk-md open-prod-detail"
                      onClick={() => handleProductClick(product.productId)}
                    >
                      <div>
                        <h3>{product.productName}</h3>
                        <p>${product.price.toFixed(2)}</p>
                      </div>

                      <div className="rm-md">
                        <p>⭐⭐⭐⭐⭐</p>
                        <p>{product.rating}</p>
                      </div>
                    </div>

                    <Addcart product={product}>
                      <CartAction
                        dataId={product.productId}
                        dataQuantity={product.quantity}
                        incAction={incrementProduct}
                        decAction={decrementProduct}
                      />
                    </Addcart>
                  </div>
                ))}
              </div>
            </div>
          </main>

          <section className="last-bar">
            <div className="recently card">
              <h2>Recently Added</h2>

              <div className="products">
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="best-selling card">
              <h2>Best Selling</h2>

              <div className="products">
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
                <div className="product flex">
                  <img src="images/shop-fone.PNG" alt="" />
                  <div>
                    <h3>Couple's phone</h3>
                    <p>
                      ⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span>
                    </p>
                    <p>$300</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Base>
  );
}

export default Dashboard;
