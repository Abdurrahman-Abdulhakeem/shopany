import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import HamProvider from './components/providers/HamProvider';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ProductDetail from './screens/ProductDetail';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './redux/productSlice';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
}, [dispatch])

  return (
    <Router>
      <HamProvider>
        <Routes>
          <Route path='/' index element={<LoginScreen />}/>
        
          
          <Route path='/login' element={<LoginScreen />}/>
        
          <Route path='/register' element={<RegisterScreen />}/>
        
          <Route path='/dashboard' element={<Dashboard />}/>

          <Route path='/product/:productId' element={<ProductDetail />} />
        
          <Route path='/cart' element={<Cart />} />
        
          <Route path='/profile' element={<Profile />} />
        </Routes>
        </HamProvider>

        <ToastContainer />
    </Router>
    
  );
}

export default App;
