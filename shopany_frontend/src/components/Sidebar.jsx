import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useHam } from "./providers/HamProvider";

import { LuLayoutDashboard } from "react-icons/lu"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { IoCartOutline, IoCodeSlashSharp } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { TbLogout } from "react-icons/tb"
import { MdOutlineCategory, MdOutlineBookmarkBorder } from "react-icons/md"


function Sidebar() {
    const { toggleBar } = useHam()
    const [hamburger, setHamburger] = useState(null)

    const handleHamburger = (burger) => {
        setHamburger((hamburg) => hamburg === burger ? null : burger)
    }

    const location = useLocation()

    const pathname = location.pathname

    const splitPathname = pathname.split("/")


    return (
        <aside className={`sidebar ${toggleBar ? 'active' : ""} `}>

            <h1>Shopany</h1>
            <nav>
                <li><Link to="/cart" className={`flex-icon ${splitPathname[1] === 'cart' && 'active'} `}>
                   <span className="icon"><IoCartOutline /></span> <span>Cart</span>  <small className="cart-num">50</small> </Link></li>

                <li><Link className={`flex-icon ${splitPathname[1] === 'dashboard' && 'active'} `} to="/dashboard">
                    <span className="icon"><LuLayoutDashboard /></span> <span>Dashboard</span> </Link></li>

                <li onClick={() => handleHamburger('categories')} className={`cat ${hamburger === 'categories' && 'active'}`}><Link className="flex-icon" to="#"> <span className="icon"><MdOutlineCategory /></span> <span>Categories</span> {hamburger === 'categories' ? <IoIosArrowUp /> : <IoIosArrowDown /> }</Link>
                    <ul className="inner-category">
                        <li><Link to="">Sneakers</Link></li>
                        <li><Link to="">Food stuff</Link></li>
                        <li><Link to="">Groceries</Link></li>
                    </ul>
                </li>
                <li onClick={() => handleHamburger('orders')} className={`cat ${hamburger === 'orders' && 'active'}`}><Link className="flex-icon" to="#"><span className="icon"><MdOutlineBookmarkBorder /></span> <span>Orders</span> {hamburger === 'orders' ? <IoIosArrowUp /> : <IoIosArrowDown /> }</Link>
                    <ul className="inner-category">
                        <li><Link to="">Pending</Link></li>
                        <li><Link to="">Approved</Link></li>
                    </ul>
                </li>

                <li><Link className={`flex-icon ${splitPathname[1] === 'developer' && 'active'} `} to="">
                <span className="icon"><IoCodeSlashSharp /></span> <span>Developer</span></Link></li>
                
                <li><Link className={`flex-icon ${splitPathname[1] === 'profile' && 'active'} `} to="/profile"><span className="icon"><CgProfile /></span> <span>Profile</span></Link></li>

                <li><Link to="" className="flex-icon"><span className="icon"><TbLogout /></span> <span>Logout</span></Link></li>
            </nav>
        </aside >
    )
}


export function Hamburger() {

    const { toggleBar, dispatch } = useHam()

    return (
        <div className={`main-hamburger ${toggleBar ? 'active' : ""}`} onClick={() => dispatch({ type: "toggleBar" })}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Sidebar