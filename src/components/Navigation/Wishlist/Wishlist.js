import React, { useState, useContext, useEffect } from 'react';
import Product from '../Product/Product';
import AuthContext from '../store/auth-context';
import Spinner from '../UI/Spinner/Spinner';
import style from './Wishlist.module.css';


const Wishlist = () => {

    const setInitProducts = useContext(AuthContext).setProducts;
    const productsCtx = useContext(AuthContext).initProducts;

    const [loader, setLoader] = useState(false);

    
    // we use useEffect because if user refresh page we can't get productsCtx because it is empty so we grab them from firebase
    // if you come from home page we get items because we fetch them from Home.js
    useEffect(() => {
        // isArray() like name says check if this is array -> must be array and should not be empty !productsCtx.length = true for [] / false for [nesto]
        if (Array.isArray(productsCtx) && !productsCtx.length) {
            setLoader(true);
            fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/inputdata.json', {
                method: 'GET',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            }).then(response => response.json())
                .then(responseData => {

                    if (responseData) {
                        const productsList = Object.keys(responseData).map(item => {
                            return {
                                id: item,
                                ...responseData[item]
                            };
                        });
                        // setProducts(productsList);
                        setInitProducts(productsList);
                    }
                    setLoader(false);
                }).catch(error => console.log(error));
        }
    }, [setInitProducts, productsCtx]);

    // filter favorite items
    const productsCtxFavorite = productsCtx.filter(item => item.isFavourite);

    // message if array is empty
    const messageH1 = !productsCtxFavorite.length && <h1>You have no favorite items.</h1>;

    return (
        <section className="section-main section-main-xl section-main-xxl">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <ul className={style.ul}>
                            {messageH1}
                            {!loader ? productsCtxFavorite.map(product => <Product key={product.id} product={product} />) : <Spinner />}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Wishlist;