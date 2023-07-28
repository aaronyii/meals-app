import { useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useSelector } from 'react-redux';

const HeaderCartButton = (props) => {
  
  const {items} = useSelector(state => state.cart);
  const [btnHighlighted, setBtnHighlighted] = useState(false)

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`
  useEffect(()=>{
    if (items.length === 0 )
      return;
    
    setBtnHighlighted(true);

    const timer = setTimeout(() => {setBtnHighlighted(false)}, 300);
    return () => {clearTimeout(timer)}
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;