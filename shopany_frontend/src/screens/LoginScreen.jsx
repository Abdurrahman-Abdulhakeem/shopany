import { Link } from 'react-router-dom'

function LoginScreen() {
  return (
    <div class="register-container">

        <div class="register card">
            <h2>Login to your Shopany account</h2>
            <div>
                <label for="email">Email address</label>
                <input type="email" name="email" placeholder="" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="" />
            </div>
           
            <input type="submit" value="Login" class="btn" />

            <p>Don't have an account yet? <Link to="/register" style={{marginLeft: "10px", color:"rgb(123, 104, 238)"}}>Sign up</Link></p>
        </div>

        <p style={{fontSize: "1.3em", color: "#fff"}}> &copy; Shopany 2023</p>
    </div>
  )
}

export default LoginScreen