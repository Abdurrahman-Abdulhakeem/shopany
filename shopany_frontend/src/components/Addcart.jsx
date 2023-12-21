
function Addcart({children}) {
  return (
    <div className="flex blk-md">
        {children}
    {/* <!-- <div className="mini-spinner"></div> --> */}
    <button className="btn">Add to cart</button>

  </div>
  )
}

export function CartAction() {
    return (
      <div className="inc">
      <span role="button" className="plus">+</span>
      <span className="quantity">1</span>
      <span role="button" className="minus">-</span>
    </div>
    )
  }


export default Addcart