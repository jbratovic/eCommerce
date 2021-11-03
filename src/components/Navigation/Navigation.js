import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, NavLink, Redirect, useHistory } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreateProductsPage from './pages/CreateProductsPage';
import CartItemPage from './pages/CartItemPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import Wishlist from './pages//WishlistPage';
import ProductDetails from './ProductDetails/ProductDetails';
import CartIcon from './UI/FavIcon/CartIcon';

import AuthContext from './store/auth-context';

import './Navigation.css';


const Navigation = () => {
    const history = useHistory();

    const authCth = useContext(AuthContext);
    const loggedUser = authCth.isUserLoggedIn;

    const updateCartItemsNumber = useContext(AuthContext).updateCartItems;
    const itemsInCartLength = useContext(AuthContext).cartItemsLength;


    useEffect(() => {

        const fetchCart = async () => {

            const response = await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/cart.json`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            });
            const responseData = await response.json();

            if (responseData) {
                const itemsInCart = Object.keys(responseData).map(item => responseData[item]);
                updateCartItemsNumber(itemsInCart.length);
            }
        }

        fetchCart();

    }, [updateCartItemsNumber]);


    const logoutHandler = () => {
        authCth.logout();
        history.replace('/');
    }

    const cartHandler = () => {
        authCth.modalOverlayHandler();
    }


    return (
        <div className="Navigation">

            <header>
                <nav className="Nav">
                    <ul>
                        <li>
                            <NavLink to="/" exact={true}>Home</NavLink>
                        </li>

                        {loggedUser && (
                            <li>
                                <NavLink to="/create">Create</NavLink>
                            </li>
                        )}

                        {loggedUser && (
                            <li>
                                <NavLink to="/wishlist">Wishlist</NavLink>
                            </li>
                        )}

                        {loggedUser && (
                            <li>
                                <NavLink to="/account">Account</NavLink>
                            </li>
                        )}

                        {!loggedUser && (
                            <li>
                                <NavLink to="/auth">Login</NavLink>
                            </li>
                        )}

                        {loggedUser && (
                            <li>
                                <button className="logout-btn" onClick={logoutHandler}> Logout </button>
                            </li>
                        )}

                        {loggedUser && (
                            <li className="cart-Icon" onClick={cartHandler}>
                                <span className="cart-Basket">{itemsInCartLength}</span>
                                <CartIcon />
                            </li>
                        )}

                    </ul>
                </nav>
            </header>

            <Switch>
                <Route path="/" exact>
                    <HomePage />
                </Route>

                <Route path="/create">
                    {loggedUser && <CreateProductsPage />}
                    {!loggedUser && <Redirect to="/auth" />}
                </Route>

                <Route path="/cart">
                    {loggedUser && <CartItemPage />}
                    {!loggedUser && <Redirect to="/auth" />}
                </Route>

                <Route path="/wishlist">
                    {loggedUser && <Wishlist />}
                    {!loggedUser && <Redirect to="/auth" />}
                </Route>

                <Route path="/account">
                    {loggedUser && <AccountPage />}
                    {!loggedUser && <Redirect to="/auth" />}
                </Route>

                <Route path="/auth">
                    {!loggedUser && <AuthPage />}
                </Route>

                {/* if you want to transfer data to another component using state of <Link state: { product: props.product } /> ->you must direct import component, not like above */}
                <Route path="/product-details/:id" component={ProductDetails}>
                    {/*  {loggedUser && <ProductDetailsPage />}
                    {!loggedUser && <Redirect to="/auth" />} */}
                </Route>

                {/* if URL doesn't exist redirect to / */}
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>

        </div>

    );
}

export default React.memo(Navigation);