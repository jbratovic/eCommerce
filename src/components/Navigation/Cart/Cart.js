import React, { useEffect, useState, useContext } from 'react';
import CartItem from './CartItem/CartItem';
import Spinner from '../UI/Spinner/Spinner';
import Modal from '../UI/Modal/Modal';
import AuthContext from '../store/auth-context';
import Checkout from '../Checkout/Checkout';

import './Cart.css';
import badge from '../../../assets/badge.png';


const Cart = () => {

    const closeModal = useContext(AuthContext).modalOverlayHandler;
    const resetCartSuccess = useContext(AuthContext).resetCartSuccess; // reset "removeCartSuccessfully" after user order

    const cartProducts = useContext(AuthContext).cartProductsList;
    const setCartProducts = useContext(AuthContext).setCartProductsHandler;
    const successOrder = useContext(AuthContext).removeCartSuccess;

    const updateCartItemsNumber = useContext(AuthContext).updateCartItems;

    const [loader, setLoader] = useState(false);
    const [disable, setDisable] = useState(false);
    const [checkoutVisible, setCheckoutVisible] = useState(false);


    useEffect(() => {

        setLoader(true);
        const fetchCartData = async () => {

            try {
                const response = await fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart.json', {
                    method: 'GET',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify()
                });

                const responseData = await response.json();
                if (responseData) {
                    const cartList = Object.keys(responseData).map(item => {
                        return {
                            // cartID: item,
                            ...responseData[item],
                            id: item,
                            itemSum: responseData[item].quantity * responseData[item].price

                        };
                    });
                    console.log("cartList:", cartList);
                    setCartProducts(cartList);
                } else {
                    setCartProducts([]);  // if database is empty reset cartProducts = []
                }
                setLoader(false);
            } catch (error) {
                console.log("error:", error)
            }
        }

        fetchCartData();
    }, [setCartProducts]); // just for trigger useEffect() on every deleted item


    const goHome = () => {
        closeModal();
        resetCartSuccess();
    }

    const addProductCartHandler = async (id) => {

        const itemIndex = cartProducts.findIndex(item => item.id === id);

        // most sutable object change in immutable way
        const newCartList = cartProducts.map((item, index) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    itemSum: item.itemSum + parseFloat(item.price),
                    quantity: item.quantity += 1
                };
            }
            return item;
        });

        setCartProducts(newCartList);// update state for calculating below variable "subTotal" instantly in real time, otherwise it calculate only when refresh because we get "cartProducts" from firebase
        setDisable(true);
        try {
            await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart/${id}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCartList[itemIndex])
            });

            setDisable(false);

        } catch (error) {
            console.log("error:", error);
        }
    }

    const removeProductCartHandler = async (id) => {

        const itemIndex = cartProducts.findIndex(item => item.id === id);

        // id: -MmcWsHbfvKtTlx2bmI3 a itemIndex = 0, 1, 2

        // most sutable object change in immutable way
        const newCartList = cartProducts.map((item, index) => {
            if (index === itemIndex) {
                return {
                    ...item,
                    itemSum: item.itemSum - parseFloat(item.price),
                    quantity: item.quantity -= 1
                };
            }
            return item;
        });

        setDisable(true);
        if (newCartList[itemIndex].quantity < 1) {

            // update state for calculating below variable "subTotal" instantly in real time, otherwise it calculate only when refresh because we get "cartProducts" from firebase
            const deleteElement = newCartList.filter(item => item.id !== id);
            setCartProducts(deleteElement); 
            updateCartItemsNumber(newCartList.length - 1);

            await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart/${id}.json`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCartList[itemIndex])
            });
            setDisable(false);
        } else {
            setCartProducts(newCartList);

            await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart/${id}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCartList[itemIndex])
            });
            setDisable(false);
        }
    }

    const checkoutHandler = () => {

        setCheckoutVisible(prevState => !prevState);
    }

    // sum all prices 
    const subTotal = cartProducts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.itemSum
    }, 0).toFixed(2);

    // console.log(cartProducts);
    return (
        <Modal>
            <section className="section-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">

                            <div className="col-md-12 text-left m-b-4">
                                <button className="btn btn-bright" onClick={goHome}> Back </button>
                            </div>

                            {!loader ? <div className="col-md-12">

                                {cartProducts.length > 0 ? <div className="cart-main">
                                    {cartProducts.map(item =>
                                        <CartItem
                                            key={item.id}
                                            product={item}
                                            isDisabled={disable}
                                            removeProduct={() => removeProductCartHandler(item.id)}
                                            addProduct={() => addProductCartHandler(item.id)}
                                        />
                                    )}</div> : !successOrder && !checkoutVisible ? <h3 className="text-center">You have no products in cart.</h3> : null}

                            </div> : <Spinner />
                            }

                            {cartProducts.length > 0 && <div className="col-md-12 m-t-2">
                                <div className="subtotal">
                                    <p><strong>Sub total:</strong> {subTotal} kn</p>
                                    <button
                                        className="btn btn-brand"
                                        onClick={checkoutHandler}> Checkout
                                    </button>
                                </div>
                            </div>
                            }

                            {checkoutVisible && !successOrder ? <Checkout /> : checkoutVisible && successOrder ? <div className="text-center"> <img src={badge} style={{ width: '300px' }} alt="Badge" /> <h3 className="text-center" style={{ color: 'green' }}>You Successfully ordered items!</h3></div> : null}

                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    );
}

export default Cart;