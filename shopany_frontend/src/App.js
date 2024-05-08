import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./screens/Dashboard";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import Sneakers from "./screens/Categories/Sneakers";
import FoodStuffs from "./screens/Categories/FoodStuffs";
import Groceries from "./screens/Categories/Groceries";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductDetail from "./screens/ProductDetail";

import HamProvider from "./components/providers/HamProvider";

import { userLoginState } from "./redux/userLoginSlice";
import { getUser } from "./redux/getUserSlice";
import LoginRequired from "./utils/LoginRequired";

function App() {
  const { user } = useSelector(userLoginState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.access) {
      dispatch(getUser());
    }
  }, [user, dispatch]);

  return (
    <Router>
      <HamProvider>
        <Routes>
          <Route path="/" index element={<LoginScreen />} />

          <Route path="/login" element={<LoginScreen />} />

          <Route path="/register" element={<RegisterScreen />} />

          <Route
            path="/dashboard"
            element={
              <LoginRequired>
                {" "}
                <Dashboard />{" "}
              </LoginRequired>
            }
          />
          <Route path="/categories/sneakers" element={<Sneakers />} />
          <Route path="/categories/foodstuffs" element={<FoodStuffs />} />
          <Route path="/categories/groceries" element={<Groceries />} />

          <Route path="/product/:productId" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </HamProvider>

      <ToastContainer />
    </Router>
  );
}

export default App;
