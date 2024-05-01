import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Base from "../components/Base";
import { Hamburger } from "../components/Sidebar";
import Addcart, { CartAction } from "../components/Addcart";
import Loader from "../components/Loader";

import {
  productState,
  incrementProduct,
  decrementProduct,
} from "../redux/productSlice";

function ProductDetail() {
  const { products } = useSelector(productState);

  const { productId } = useParams();
  const navigate = useNavigate();

  const selectedProduct = products.find(
    (product) => product.productId === parseInt(productId)
  );

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (!selectedProduct) {
    return (
      <Base>
        <Loader />
      </Base>
    );
  }
  return (
    <Base>
      <main className="dashboard">
        <Hamburger />

        <div className="product-container">
          <div className="product-detail card">
            <div className="flex">
              <div>
                <img
                  src={`../${selectedProduct?.productImage}`}
                  alt=""
                  className="cover-img"
                />
              </div>

              <div>
                <h1>{selectedProduct?.productName}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus a iusto praesentium nihil voluptatem quam voluptatibus
                  tempora quis, cum eveniet?
                </p>
                <p>
                  ⭐⭐⭐⭐⭐{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {selectedProduct?.rating} reviews
                  </span>
                </p>

                <h3>${selectedProduct?.price.toFixed(2)}</h3>

                <Addcart product={selectedProduct}>
                  <CartAction
                    dataId={selectedProduct?.productId}
                    dataQuantity={selectedProduct?.quantity}
                    incAction={incrementProduct}
                    decAction={decrementProduct}
                  />
                </Addcart>
              </div>
            </div>
          </div>

          <div className="products in-detail">
            {/* Check for products in same category with the selected product  */}
            <h2>Similar Products</h2>

            <div className="flex wrap">
              {products?.map((product) => (
                <div className="product" key={product.productId}>
                  <img
                    src={`../${product?.productImage}`}
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
        </div>
      </main>
    </Base>
  );
}

export default ProductDetail;
