import { CartAction } from "../components/Addcart"
import Base from "../components/Base"
import { Hamburger } from "../components/Sidebar"
import { Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

function Cart() {
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

              <tbody className="tbody">
                <td><img src="images/hero-bg.PNG" alt="" /></td>
                <td>Nikey Girl <span style={{ marginLeft: "6px;" }}>x1</span></td>
                <td>
                 <CartAction />
                </td>
                <td style={{color: 'rgb(123, 104, 238)', fontSize: '25px', }}> <span style={{cursor: 'pointer'}}><AiTwotoneDelete /></span></td>
                <td>$300</td>
              </tbody>
              <tbody>
                <td><img src="images/hero-bg.PNG" alt="" /></td>
                <td>Nikey Girl <span style={{ marginLeft: "6px;" }}>x1</span></td>
                <td>
                <CartAction />
                </td>
                <td style={{color: 'rgb(123, 104, 238)', fontSize: '25px', }}> <span style={{cursor: 'pointer'}}><AiTwotoneDelete /></span></td>
                <td>$300</td>
              </tbody>

            </table>
          </div>


          <div className="overview">
            <span>
              <p className="view">Delivery <span style={{ marginLeft: "15px;" }}>$0.00</span></p>
            </span>
            <span>
              <p className="view">Sub total <span style={{ marginLeft: "15px;" }}>$600.00</span></p>
            </span>
            <span>
              <p className="view">Total <span style={{ marginLeft: "15px;" }}>$600.00</span></p>
            </span>
          </div>


          <div className="checkout">
            <button className="btn"><Link to="/dashboard">Continue shopping</Link></button>
            <input type="submit" value="Checkout" className="btn" />
          </div>

        </div>

      </main>

    </Base>
  )
}

export default Cart