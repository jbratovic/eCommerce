import React, { Fragment, useContext } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import AuthContext from '../../store/auth-context';


const Backdrop = (props) => {

    const backdropCtx = useContext(AuthContext).modalOverlayHandler;
    const resetCartSuccess = useContext(AuthContext).resetCartSuccess; // reset "removeCartSuccessfully" after user order 

    const backdropHandler = () => {
        backdropCtx();
        resetCartSuccess();
    }

    return (
        <div className={style.backdrop} onClick={backdropHandler}>{props.children}</div>
    );
}

const ModalOverlay = (props) => {
    return (
        <div className={style.modal}>
            <div className={style.content}>{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement)}
        </Fragment>
    );
}

export default Modal;