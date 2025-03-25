import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home/Home.js";
import About from "./pages/About/About.js";
import Login from './pages/Home/Login.js';
import Signup from './pages/Home/Signup.js';
import Userdata from './pages/Userdata/Userdata.js';
import Menu from './pages/Menu/Menu';
import Cart from './pages/Cart/Cart.js';
import Payment from "./pages/Payments/Payment.js";
import Cards from './component/Layouts/Cards.js';
import Contact from "./pages/Contact/Contact.js";
import Confirm from './pages/Confirm/Confirm.js';
import Admin from './pages/Admin/Admin.js';
import Acrud from './pages/Admin/Acrud.js';
import Orders from './pages/Orders/Orders.js';
import Myorder from './pages/Myorder/Myorder.js';


function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />}/> 
        <Route path="/Signup" element={<Signup/>}/> 
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/Acrud" element={<Acrud/>} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart/>} /> 
        <Route path="/Userdata" element={<Userdata/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/about" element={<About/>}/> 
        <Route path="/Contact" element={<Contact/>} />   
        <Route path="/Myorder" element={<Myorder/>} />   
        <Route path="/Orders" element={<Orders />} />
        <Route path="/" element={<Cards />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
