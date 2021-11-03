import React, { useState, useEffect, useContext } from 'react';
import Product from '../Product/Product';
import Spinner from '../UI/Spinner/Spinner';
import styles from './Home.module.css';
import AuthContext from '../store/auth-context';


const Home = () => {

    const [loader, setLoader] = useState(false);

    const setInitProducts = useContext(AuthContext).setProducts;
    const productsCtx = useContext(AuthContext).initProducts;

    useEffect(() => {

        setLoader(true);
        // we must use async inside useEffect and execute it at bottom because:  useEffect doesn't expect the callback function to return Promise, rather it expects that nothing is returned or a function is returned. https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret
        const fetchData = async () => { //-> or you can use just regular function: async function fetchData() 
            try {

                const response = await fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/inputdata.json', {
                    method: 'GET',
                    header: { 'Content-Type': 'application/json' },
                    body: JSON.stringify()
                });

                const responseData = await response.json();
                if (responseData) {

                    const productsList = Object.keys(responseData).map(item => {
                        return {
                            id: item,
                            ...responseData[item]
                        };
                    });
                    setInitProducts(productsList);
                } else {
                    setInitProducts([]);
                }
                setLoader(false);
            } catch (error) {
                console.log("error:", error);
            }
        }
       
        fetchData();
    }, [setInitProducts]);


    return (
        <section className="section-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="m-b-2">Products</h1>
                    </div>
                    <div className="col-md-12">
                        <div className="item-container">

                            <ul className={styles.wrapper}>
                                {
                                    !loader ? productsCtx.map(product => <Product key={product.id} product={product} />) : <Spinner />
                                }
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Home);