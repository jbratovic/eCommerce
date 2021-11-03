import React, { useState, useEffect, useContext } from 'react';
import StarIcons from '../UI/StarIcons/StarIcons';
import './ProductDetails.css';

import AuthContext from '../store/auth-context';

import Spinner from '../UI/Spinner/Spinner';

const Product = (props) => {

    const { product } = props.location.state;

    const [firebaseObjects, setFirebaseObjects] = useState([]);
    const [cartItemsList, setCartItemsList] = useState([]);
    const [productQuantity, setProductQuantity] = useState({ quantity: 1, userRate: 0 }); // init values
    const [backendRateStar, setBackendRateStar] = useState(null); // star rate from firebase backend, initial null
    const [loader, setLoader] = useState(false);

    const updateCartItemsNumber = useContext(AuthContext).updateCartItems;

    useEffect(() => {

        const fetchCart = async () => {

            try {
                const response = await fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart.json', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const responseData = await response.json();

                if (responseData) {

                    const firebaseOriginal = Object.keys(responseData).reduce(
                        (accumulator, currentValue) => Object.assign({ [currentValue]: responseData[currentValue] }, accumulator), []);
                    setFirebaseObjects(firebaseOriginal);

                    const cartItems = Object.keys(responseData).map(items => responseData[items]);
                    const cartItemProductObject = cartItems.filter(item => item.productCode === product.productCode); // get object with code for unique identification
                    const cartItemProductStar = cartItemProductObject.reduce((accumulator, currentValue) => currentValue.userRate, 0); // get star rate of that object
                    setCartItemsList(cartItems);
                    setBackendRateStar(cartItemProductStar);
                    setLoader(false);
                }
            } catch (error) {
                console.log("error:", error);
            }
        }

        fetchCart();

    }, [product.productCode, loader]); // we can ommit setCartItemsList, setBackendRateStar and setLoader functions because it's created by react useState()"loader" is added for firebase to run "useEffect" if you add fresh new item, and click "Add to cart" on first select of item

    const addToCartHandler = async () => {

        const cartProduct = { ...product, ...productQuantity }; //merge objects into one

        const indexOfElement = cartItemsList.findIndex(item => item.id === product.id);// check if item exist in state local

        const cartKeyForBase = Object.keys(firebaseObjects).filter(item => firebaseObjects[item].id === product.id)[0]; // unique key of item in database

        if (indexOfElement !== -1) {

            // immutable way of update element in array of objects, instead of manually create copy and blah blah...
            const updatedItems = cartItemsList.map(item => {

                if (item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + cartProduct.quantity,
                        userRate: cartProduct.userRate
                    };
                }

                return item;
            });
            setCartItemsList(updatedItems);

            const filterItemForBase = updatedItems.filter(item => item.id === product.id); // extract just clicked one from "updatedItems" array
            const updatedItem = {
                comment: '',
                descriptionTitle: '',
                id: '',
                isFavourite: '',
                price: '',
                productCode: '',
                productName: '',
                quantity: '',
                urlimage: '',
                userRate: ''
            };
            for (const i in filterItemForBase) {
                updatedItem.comment = filterItemForBase[i].comment
                updatedItem.descriptionTitle = filterItemForBase[i].descriptionTitle
                updatedItem.id = filterItemForBase[i].id
                updatedItem.isFavourite = filterItemForBase[i].isFavourite
                updatedItem.price = filterItemForBase[i].price
                updatedItem.productCode = filterItemForBase[i].productCode
                updatedItem.productName = filterItemForBase[i].productName
                updatedItem.quantity = filterItemForBase[i].quantity
                updatedItem.urlimage = filterItemForBase[i].urlimage
                updatedItem.userRate = filterItemForBase[i].userRate
            }

            setLoader(true);
            await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart/${cartKeyForBase}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });
            setLoader(false);
        } else {
            const addNewItem = [...cartItemsList, cartProduct];

            setCartItemsList(addNewItem);
            updateCartItemsNumber(cartItemsList.length + 1); // update cart number of items in navigation
            setLoader(true);
            await fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart.json', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartProduct)
            });
            setLoader(false);
        }
    }

    const goBack = () => {
        props.history.goBack();
    }

    const rateProduct = (event) => {

        const rate = +event.target.dataset.value;
        setProductQuantity(prevState => {
            return { ...prevState, userRate: rate }
        });
    }


    return (
        <section className="section-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="col-md-4 m-t-2 m-b-3 text-left">
                            <button
                                className="btn btn-brand"
                                onClick={goBack}> Back
                            </button>
                        </div>

                        <div className="product-container">
                            <div className="product-box">
                                <img src={product.urlimage} className="img-responsive" alt="Italian Trulli" />
                            </div>
                            <div className="product-box text-left">
                                <h3 className="m-b-1">{product.productName}</h3>

                                <StarIcons starFromFirebase={backendRateStar} widthRate={productQuantity.userRate} rateIt={rateProduct} />

                                <p className="l m-t-1">
                                    {product.price} kn
                                </p>
                                <p className="s m-t-2 m-b-2">
                                    <span className="product-code">{product.productCode}</span>
                                </p>

                                <div className="quantity">
                                    <div className="form-input-set">
                                        <input onChange={(event) => setProductQuantity(prevState => {
                                            return { ...prevState, quantity: parseInt(event.target.value) }
                                        })}
                                            type="number"
                                            className="form-input"
                                            name="text1"
                                            id="text1"
                                            placeholder="1"
                                            min="1"
                                            value={productQuantity.quantity} />
                                    </div>

                                    {!loader ? <button
                                        className="btn btn-brand"
                                        onClick={addToCartHandler}> Add to cart </button> : <Spinner style={{ top: "-20px" }} />
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="description text-left m-t-4">
                            <h4 className="m-b-1">{product.descriptionTitle}</h4>
                            <p>{product.comment}</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;