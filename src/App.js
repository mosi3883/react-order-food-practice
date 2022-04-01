import Header from './components/Layout/Header';
import React, { useState } from 'react';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
function App() {
  const [cartIsShown, setCartIsShown] = useState(true);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <React.Fragment>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </React.Fragment>
  );
}

export default App;
