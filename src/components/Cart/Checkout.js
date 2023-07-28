import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isFiveChars = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });
    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street name</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter a valid postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
