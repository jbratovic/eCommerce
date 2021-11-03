import React, { useContext } from 'react';
import useInput from '../../hooks/use-input';
import AuthContext from '../store/auth-context';

import container from './Checkout.module.css';
import style from '../UI/GlobalCSS.module.css';

// custom form validation
const Checkout = () => {

    const cart = useContext(AuthContext).cartProductsList;
    const removeItemsInCart = useContext(AuthContext).removeItemsInCart;

    const {
        value: emailValue,
        isInputValid: inputEmail,
        isBlur: isBlurEmail,
        inputHandler: inputHandlerEmail,
        onBlurHandler: onBlurHandlerEmail
    } = useInput('email');

    const {
        value: nameValue,
        isInputValid: inputName,
        isBlur: isBlurName,
        inputHandler: inputHandlerName,
        onBlurHandler: onBlurHandlerName
    } = useInput('name');

    const {
        value: surnameValue,
        isInputValid: inputSurname,
        isBlur: isBlurSurname,
        inputHandler: inputHandlerSurname,
        onBlurHandler: onBlurHandlerSurname
    } = useInput('surname');

    const {
        value: addressValue,
        isInputValid: inputAddress,
        isBlur: isBlurAddress,
        inputHandler: inputHandlerAddress,
        onBlurHandler: onBlurHandlerAddress
    } = useInput('address');

    const {
        value: zipcodeValue,
        isInputValid: zipCode,
        isBlur: isBlurZipCode,
        inputHandler: inputHandlerZipCode,
        onBlurHandler: onBlurHandlerZipCode
    } = useInput('zipcode');

    const {
        value: checkboxValue,
        isInputValid: checkbox,
        isBlur: isBlurCheckbox,
        checkboxHandler: inputHandlerCheckbox,
        onBlurHandler: onBlurHandlerCheckbox
    } = useInput('checkbox');

    let isValid = false;
    if (inputName && inputSurname && inputAddress && zipCode && checkbox) {
        isValid = true;
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();

        if (!isValid) {
            return;
        }

        const orderDetails = {
            email: emailValue,
            name: nameValue,
            surname: surnameValue,
            address: addressValue,
            zipcode: zipcodeValue,
            checkbox: checkboxValue,
            _order: cart
        };

        try {
            await Promise.all([
                // insert cart orders into "orders.json"
                fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/orders.json', {
                    method: 'POST',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderDetails)
                }),
                // delete "cart.json" after successful order
                fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart.json', {
                    method: 'DELETE',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify()
                }),
            ]);

            removeItemsInCart(); // remove local items in cart, just for case

        } catch (error) {
            console.log("error:", error);
        }

    }

    // error messages
    const errorMessageEmail = !inputEmail && isBlurEmail && <p className={style.errorMessage}>Please enter valid e-mail address.</p>;
    const errorMessageName = !inputName && isBlurName && <p className={style.errorMessage}>Please enter your name.</p>;
    const errorMessageSurname = !inputSurname && isBlurSurname && <p className={style.errorMessage}>Please enter your surname.</p>;
    const errorMessageAddress = !inputAddress && isBlurAddress && <p className={style.errorMessage}>Please enter address.</p>;
    const errorMessageZipCode = !zipCode && isBlurZipCode && <p className={style.errorMessage}>Zipcode must be 5 characters.</p>;
    const errorMessageCheckbox = !checkbox && isBlurCheckbox && <p className={style.errorMessage}>You must agree with terms.</p>;

    return (
        <div className="col-md-12 m-t-1">

            <div className={container.formContainer}>
                <h4 className="text-center m-b-1">Checkout</h4>
                <form onSubmit={onSubmitForm}>

                    <div className={`form-input-set ${errorMessageEmail && "decoration-negative"}`}>
                        <label htmlFor="email">Your email</label>
                        <input type="text" className="form-input" onChange={inputHandlerEmail} onBlur={onBlurHandlerEmail} name="email" id="email" placeholder="E-mail" />
                        {errorMessageEmail}
                    </div>

                    <div className={`form-input-set ${errorMessageName && "decoration-negative"}`}>
                        <label htmlFor="name">Your name</label>
                        <input type="text" className="form-input" onChange={inputHandlerName} onBlur={onBlurHandlerName} name="name" id="name" placeholder="Name" />
                        {errorMessageName}
                    </div>

                    <div className={`form-input-set ${errorMessageSurname && "decoration-negative"}`}>
                        <label htmlFor="surname">Your surname</label>
                        <input type="text" className="form-input" onChange={inputHandlerSurname} onBlur={onBlurHandlerSurname} name="surname" id="surname" placeholder="Surname" />
                        {errorMessageSurname}
                    </div>

                    <div className={`form-input-set ${errorMessageAddress && "decoration-negative"}`}>
                        <label htmlFor="address">Your address</label>
                        <input type="text" className="form-input" onChange={inputHandlerAddress} onBlur={onBlurHandlerAddress} name="address" id="address" placeholder="Address" />
                        {errorMessageAddress}
                    </div>

                    <div className={`form-input-set ${errorMessageZipCode && "decoration-negative"}`}>
                        <label htmlFor="street">Zipcode</label>
                        <input type="number" className={`form-input ${style.number}`} onChange={inputHandlerZipCode} onBlur={onBlurHandlerZipCode} name="street" id="street" placeholder="Zipcode" />
                        {errorMessageZipCode}
                    </div>

                    <div className="form-input-set">
                        <input type="checkbox" className={`${style.checkboxInput}`} onChange={inputHandlerCheckbox} onBlur={onBlurHandlerCheckbox} defaultChecked={!!checkbox} id="agree" name="agree" /> {/* or defaultChecked={checkbox || false}-> initial checkbox is empty */}
                        <label htmlFor="agree" className={`${style.checkboxLabel}`}> I agree to the terms of services</label>
                        {errorMessageCheckbox}
                    </div>

                    <div className="col-md-12 text-center m-t-2">
                        <button className="btn btn-brand">Submit</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Checkout;