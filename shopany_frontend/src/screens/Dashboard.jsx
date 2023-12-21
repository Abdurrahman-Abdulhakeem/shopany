import Addcart, { CartAction } from "../components/Addcart"
import Base from "../components/Base"
import { Hamburger } from "../components/Sidebar"



function Dashboard() {

  return (
    <Base>


      <main className="dashboard">
        <div className="flex search">
          <Hamburger />
          <input type="text" placeholder="Search any" />
          <button className="btn" type="submit">Search</button>
        </div>

        <h1>Welcome Rammy</h1>
        <div className="products">
          <h2>Sneakers</h2>

          <div className="flex wrap">

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex blk-md">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

           <Addcart>
            <CartAction />
            </Addcart>

            </div>
            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>
            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>
            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

            <div className="product">
              <img src="images/hero-bg.PNG" alt="" />
              <div className="flex">
                <div>
                  <h3>Nikey Girl</h3>
                  <p>$300</p>
                </div>

                <div className="rm-md">
                  <p>⭐⭐⭐⭐⭐</p>
                  <p>4.6</p>
                </div>
              </div>

            <Addcart>
            <CartAction />
            </Addcart>

            </div>

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
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
                <p>$300</p>
              </div>
            </div>
            <div className="product flex">
              <img src="images/shop-fone.PNG" alt="" />
              <div>
                <h3>Couple's phone</h3>
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
                <p>$300</p>
              </div>
            </div>
            <div className="product flex">
              <img src="images/shop-fone.PNG" alt="" />
              <div>
                <h3>Couple's phone</h3>
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
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
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
                <p>$300</p>
              </div>
            </div>
            <div className="product flex">
              <img src="images/shop-fone.PNG" alt="" />
              <div>
                <h3>Couple's phone</h3>
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
                <p>$300</p>
              </div>
            </div>
            <div className="product flex">
              <img src="images/shop-fone.PNG" alt="" />
              <div>
                <h3>Couple's phone</h3>
                <p>⭐⭐⭐⭐⭐ <span style={{ marginLeft: "10px" }}>4.6</span></p>
                <p>$300</p>
              </div>
            </div>

          </div>
        </div>
      </section>


    </Base>
  )
}

export default Dashboard