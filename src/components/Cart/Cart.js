import React, { useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import Checkout from './Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const dispatch = useDispatch();
  let { items, totalAmount }  = useSelector(state => state.cart)
  totalAmount = totalAmount.toFixed(2);
  const hasItems = items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://aaron123.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose} >
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;