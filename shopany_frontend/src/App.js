import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import HamProvider from './components/providers/HamProvider';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <Router>
      <HamProvider>
        <Routes>
          <Route path='/' index element={<LoginScreen />}/>
        
          <Route path='/login' element={<LoginScreen />}/>
        
          <Route path='/register' element={<RegisterScreen />}/>
        
          <Route path='/dashboard' element={<Dashboard />}/>
        
          <Route path='/cart' element={<Cart />} />
        
          <Route path='/profile' element={<Profile />} />
        </Routes>
        </HamProvider>
    </Router>
    
  );
}

export default App;
