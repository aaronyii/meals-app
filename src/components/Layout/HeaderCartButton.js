import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

function HeaderCartButton(props) {
  const [highlighted, setHighlighted] = useState(false);
  const cxt = useContext(CartContext);
  const { items } = cxt;
  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${highlighted ? classes.bump : ""}`;
  useEffect(() => {
    setHighlighted(true);
    const timer = setTimeout(() => {
      setHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
}

export default HeaderCartButton;
