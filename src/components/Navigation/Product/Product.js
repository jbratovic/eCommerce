import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context'
import styles from './Product.module.css';
import FavIcon from '../UI/FavIcon/FavIcon';
import FavIconFill from '../UI/FavIcon/FavIconFill';


const Product = (props) => {

    const isLoggedIn = useContext(AuthContext).isUserLoggedIn;
    const favProduct = useContext(AuthContext).isFavouriteProduct;

    const addToFavouriteHandler = async (id) => {

        favProduct(id);

        const updatedObject = {
            ...props.product,
            isFavourite: !props.product.isFavourite
        };

        try {

            await fetch(`https://e-commerce-1a48a-default-rtdb.firebaseio.com/inputdata/${id}.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedObject)
            });

        } catch (error) {
            console.log("error:", error);
        }
    }

    return (

        <li>
            {isLoggedIn && !props.product.isFavourite && <FavIcon addToFavourite={() => addToFavouriteHandler(props.product.id)} />}
            {isLoggedIn && props.product.isFavourite && <FavIconFill opacityValue={1} addToFavourite={() => addToFavouriteHandler(props.product.id)} />}

            <Link className={styles.product}
                to={{
                    pathname: isLoggedIn ? `/product-details/${props.product.id}` : `/auth`, // if user is not authenticated
                    state: { product: props.product }
                }}
            >
                <article>
                    <div className="img-box">
                        <img src={props.product.urlimage} className="img-responsive margin-auto" alt="Smiley face" />
                    </div>
                    <div className="description-box text-left m-t-1">
                        <h4 className={styles.textBlack}>{props.product.productName}</h4>
                        <p className={styles.textGray}>{props.product.price} kn</p>
                    </div>

                </article>
            </Link>
        </li>
    );
}

export default Product;