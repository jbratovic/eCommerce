import React from 'react';

const CartItem = (props) => {

    return (
        <div className="cart-box">

            <div className="product-details">

                <div className="picture-container">
                    <img src={props.product.urlimage} className="img-responsive margin-auto" alt="Smiley face" />
                    <div className="pic-details text-left">
                        <h4>{props.product.productName}</h4>
                        <p>{props.product.quantity} x {props.product.price} kn</p>
                    </div>
                </div>

            </div>

            <div className="remove-add-button">
                <button
                    className="btn btn-brand"
                    disabled={props.isDisabled}
                    onClick={props.addProduct}> +
                </button>
                <button
                    className="btn btn-brand"
                    disabled={props.isDisabled}
                    onClick={props.removeProduct}> -
                </button>
            </div>

        </div>
    );

}

export default CartItem;