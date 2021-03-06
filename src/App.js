import { useState,useEffect } from 'react';
import './App.css';
import {Products , Navbar ,Cart , Checkout} from './components'
import {commerce} from './lib/commerce'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [products,setProducts] = useState([]);
  const [cart ,setCart] = useState({});

  const fetchProduct = async ()=>{
      const{data} = await commerce.products.list();
      setProducts(data);
  }
  const fetchChart = async ()=>{
    setCart(await commerce.cart.retrieve())
  }
  const handleAddToCart = async(productId ,quantity)=>{
    // item is a cart after product has been added
    const item = await commerce.cart.add(productId , quantity);
     console.log(item.cart)
     setCart(item.cart)
  }
  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };


  useEffect(()=>{
      fetchProduct();
      fetchChart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Router>

      <div >
        <Navbar totelItems ={cart.total_items} />
        <Switch>
          <Route  path="/" exact >
            <Products products={products} onAddToCart = {handleAddToCart} />
          </Route >
          <Route exact path="/cart">
            <Cart 
              cart = {cart} 
              onUpdateCartQty={handleUpdateCartQty} 
              onRemoveFromCart={handleRemoveFromCart} 
              onEmptyCart={handleEmptyCart} 
            />
          </Route> 
          <Route exact path = "/checkout">
            <Checkout/>
          </Route>  
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
