import Modal from '../UI/Modal';
import classes from './Cart.module.css';
const Cart = (props) => {
  const cartItems = (
    <ul className={classes['card-items']}>
      {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onDismiss={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
        <button className={classes.button} onClick={console.log('ordering ...')}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
