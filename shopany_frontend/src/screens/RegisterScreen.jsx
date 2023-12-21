import React from 'react'
import { Link } from 'react-router-dom'

function RegisterScreen() {
  return (
    
    <div className="register-container">

        <div className="register card">
            <h2>Signup for Shopany</h2>
            <div>
                <label htmlFor="fname">First Name</label>
                <input type="text" name="fname" placeholder="" />
            </div>
            <div>
                <label htmlFor="lname">Last Name</label>
                <input type="text" name="lname" placeholder="" />
            </div>
            <div>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" placeholder="" />
            </div>
            <div>
                <label htmlFor="phone">Phone Number</label>
                <input type="number" name="phone" placeholder="" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="" />
            </div>
           
            <input type="submit" value="Sign up" className="btn" />

            <p>Already have an account? <Link to="/login" style={{marginLeft: "10px", color:"rgb(123, 104, 238)"}}>Login</Link></p>
        </div>

        <p style={{fontSize: "1.3em", color: "#fff"}}> &copy; Shopany 2023</p>
    </div>
  )
}

export default RegisterScreen