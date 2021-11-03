import React, { Fragment, useContext } from 'react';
import Cart from './Navigation/Cart/Cart';
import Navigation from './Navigation/Navigation';
import AuthContext from './Navigation/store/auth-context';


const CommerceMain = () => {

    const isModalVisible = useContext(AuthContext).modalOverlay;

    return (
        <Fragment>
            {isModalVisible && <Cart />}
            <Navigation />
        </Fragment>

    );
}

export default CommerceMain;
