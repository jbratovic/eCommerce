import React, { useState, useReducer, useCallback } from 'react';


const AuthContext = React.createContext({

    initProducts: [],
    setProducts: (httpProducts) => { }, // short synthax:-> setProducts(httpProducts){ }
    setCartProductsHandler: (items) => { },


    cartProductsList: [],
    cartItemsLength : 0,
    updateCartItems: () => {},
    removeCartSuccess: false,
    removeItemsInCart: () => { },
    resetCartSuccess: () => { },

    token: '',
    isUserLoggedIn: false,

    login: (tokenID, expiresIn) => { },
    logout: () => { },

    isFavouriteProduct: (itemId) => { },

    modalOverlay: false,
    modalOverlayHandler: () => { }

});

let timer;

const calculateRemainingTime = (expirationTime) => {

    const currentTime = new Date().getTime();
    const futureTime = new Date(expirationTime).getTime();

    const remainingTime = futureTime - currentTime;

    return remainingTime;
}

const defaultProducts = {
    products: [],

    cart: [],
    cartItemsBasketLength: 0,
    removeCartSuccessfully: false,

    isModalVisible: false
};
const initialProductsState = (state, action) => {

    switch (action.type) {

        case 'init':
            return {
                ...state,
                products: action.products
            };

        case 'cart':
            return {
                ...state,
                cart: action.cartItems
            };

        case 'cartItemsNr':
            return {
                ...state,
                cartItemsBasketLength: action.itemsNumber
            };

        case 'removeCart':
            return {
                ...state,
                cart: [],
                removeCartSuccessfully: true
            };

        case 'resetCartSuccess':
            return {
                ...state,
                removeCartSuccessfully: false
            };

        case 'toggleFavorite':

            const itemIndex = state.products.findIndex(item => item.id === action.id);
            const updatedProduct = [...state.products];

            updatedProduct[itemIndex] = {
                ...updatedProduct[itemIndex],
                isFavourite: !state.products[itemIndex].isFavourite
            }

            return {
                ...state,
                products: updatedProduct
            };

        case 'modal':
            return {
                ...state,
                isModalVisible: !state.isModalVisible // no need for deep copy because variable is neither array or object
            };

        default:
            return state;
    }

}

export const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token'); // initial token

    const [token, setToken] = useState(initialToken);

    // we could use just useState() but for example and training purposes we'll use useReducer()
    const [productList, setProductList] = useReducer(initialProductsState, defaultProducts);

    const loggedInUser = !!token; // check if string is empty or not


    const setInitialProducts = useCallback((httpProducts) => { // PROBLEM is that we set initialProducts and update state -> when state updates component re-renders and then useEffect() in Home/Home.js executes and update state again and we generate infinite loop, to execute setInitialProducts() only once we must use useCallback() for not recreating function in memory again
        setProductList({ type: 'init', products: httpProducts });
    }, []);

    const setCartProducts = useCallback((items) => {

        setProductList({ type: 'cart', cartItems: items });
    }, []);

    const updateCartItemsHandler = useCallback((numberOfItemsInCart) => {
        setProductList({ type: 'cartItemsNr', itemsNumber: numberOfItemsInCart });
    }, []);

    const removeItemsInCartHandler = () => {
        setProductList({ type: 'removeCart' });
    }

    const resetCartSuccessfullyHandler = () => {
        setProductList({ type: 'resetCartSuccess' });
    }

    const logoutHandler = () => {

        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (timer) {
            clearTimeout(timer);
        }
    }

    const loginHandler = (tokenID, expiresIn) => {

        setToken(tokenID);
        localStorage.setItem('token', tokenID);
        localStorage.setItem('expirationTime', expiresIn); // expirationTime after first user registration
        const remainingTimeUserAutoLogout = calculateRemainingTime(expiresIn);
        timer = setTimeout(logoutHandler, remainingTimeUserAutoLogout);
    }

    const favouriteProductHandler = (itemId) => {

        setProductList({ type: 'toggleFavorite', id: itemId });
    }

    const modalOverlayVisibility = () => {
        setProductList({ type: 'modal' });
    }

    const contextValue = {
        initProducts: productList.products,
        setProducts: setInitialProducts,
        setCartProductsHandler: setCartProducts,

        cartProductsList: productList.cart,
        cartItemsLength: productList.cartItemsBasketLength,
        updateCartItems: updateCartItemsHandler,
        removeCartSuccess: productList.removeCartSuccessfully,
        removeItemsInCart: removeItemsInCartHandler,
        resetCartSuccess: resetCartSuccessfullyHandler,

        token: token,
        isUserLoggedIn: loggedInUser,

        logout: logoutHandler,
        login: loginHandler,

        isFavouriteProduct: favouriteProductHandler,

        modalOverlay: productList.isModalVisible,
        modalOverlayHandler: modalOverlayVisibility
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthContext;