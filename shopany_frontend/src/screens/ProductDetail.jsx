import Base from '../components/Base'
import { Hamburger } from '../components/Sidebar'
import Addcart, { CartAction } from '../components/Addcart'

function productDetail() {
    return (
        <Base>

            <main className="dashboard">

                <Hamburger />

                <div className="product-container">

                    <div className="product-detail card">

                        <div className="flex">
                            <div>
                                <img src="images/shop-fone.PNG" alt="" className="cover-img" />
                            </div>

                            <div>
                                <h1>Nikey Phone</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus a iusto praesentium
                                    nihil
                                    voluptatem quam voluptatibus tempora quis, cum eveniet?</p>
                                <p>⭐⭐⭐⭐⭐ <span style={{marginLeft: "10px"}}>4.6 reviews</span></p>

                                <h3>$300</h3>

                                <Addcart>
                                    <CartAction />
                                </Addcart>
                            </div>
                        </div>

                    </div>




                    <div className="products in-detail">
                        <h2>Similar Products</h2>

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
                        </div>
                    </div>


                </div>

            </main>



        </Base>
    )
}

export default productDetail