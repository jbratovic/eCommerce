import React from 'react';
import style from './Fav.module.css';

const FavIconFill = (props) => {

    const addFavourite = () => {
        props.addToFavourite();
    }

    return (
        <svg className={style.favIcon} style={{ opacity: props.opacityValue, color: '#e20074' }} onClick={addFavourite} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M31.91 61.67L29.62 60c-9.4-6.7-16.72-13.49-21.74-20.17C3.11 33.5.48 27.39.06 21.7A17.63 17.63 0 0 1 5.45 7.16a17 17 0 0 1 11.86-4.81c3.46 0 7.93.39 11.8 3.4A19.09 19.09 0 0 1 32 8.41a19.91 19.91 0 0 1 2.91-2.67c3.89-3 8.37-3.41 11.84-3.41a16.86 16.86 0 0 1 11.85 4.8 17.51 17.51 0 0 1 5.33 14.53c-.44 5.7-3.1 11.81-7.9 18.14C51 46.5 43.63 53.3 34.21 60z"></path></svg>
    );
}

export default FavIconFill;