import React, { useState, useRef } from 'react';
import useInput from '../../hooks/use-input';

import style from '../UI/GlobalCSS.module.css';
import Spinner from '../UI/Spinner/Spinner';

const CreateProducts = () => {

    const [spinner, setSpinner] = useState(false);
    const inputRef = useRef({}); // https://aparnajoshi.netlify.app/reactjs-multiple-refs-for-handling-form-elements

    // another approach of resetting input fields after submit is using "useState", maybe better approach because of dynamically created object properties, see testHandler() below- just uncomment for test
    // const [inputObj, setInputObj] = useState({}); 

    let {
        value: productValue,
        isInputValid: inputProduct,
        isBlur: isBlurProduct,
        inputHandler: inputHandlerProduct,
        onBlurHandler: onBlurHandlerProduct
    } = useInput('default');

    const {
        value: productValueUrl,
        isInputValid: inputProductUrl,
        isBlur: isBlurProductUrl,
        inputHandler: inputHandlerProductUrl,
        onBlurHandler: onBlurHandlerProductUrl
    } = useInput('default');

    const {
        value: productValuePrice,
        isInputValid: inputProductPrice,
        isBlur: isBlurProductPrice,
        inputHandler: inputHandlerProductPrice,
        onBlurHandler: onBlurHandlerProductPrice
    } = useInput('default');

    const {
        value: productValueCode,
        isInputValid: inputProductCode,
        isBlur: isBlurProductCode,
        inputHandler: inputHandlerProductCode,
        onBlurHandler: onBlurHandlerProductCode
    } = useInput('default');

    const {
        value: productValueDescriptionTitle,
        isInputValid: inputProductDescriptionTitle,
        isBlur: isBlurProductDescriptionTitle,
        inputHandler: inputHandlerProductDescriptionTitle,
        onBlurHandler: onBlurHandlerProductDescriptionTitle
    } = useInput('default');

    const {
        value: productValueDescription,
        isInputValid: inputProductDescription,
        isBlur: isBlurProductDescription,
        inputHandler: inputHandlerProductDescription,
        onBlurHandler: onBlurHandlerProductDescription
    } = useInput('default');

    const {
        value: productValueFavorite,
        inputHandler: inputHandlerProductFavorite
    } = useInput('select');

    let isValid = false;
    if (inputProduct && inputProductUrl && inputProductPrice && inputProductCode && inputProductDescriptionTitle && inputProductDescription) {
        isValid = true;
    }

    const resetInputFields = () => {
        inputRef.current['name'].value = '';
        inputRef.current['url'].value = ''
        inputRef.current['price'].value = '';
        inputRef.current['code'].value = '';
        inputRef.current['description'].value = '';
        inputRef.current['fullDescription'].value = '';

        // another approach of resetting input fields after submit - clear input fields
        // inputObj.name2.value = ''; 
        // inputObj.url2.value = '';
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!isValid) {
            return;
        }

        const userInputs = {
            isFavourite: productValueFavorite === "true", // transform HTML select tag "string value" into boolean!
            comment: productValueDescription,
            descriptionTitle: productValueDescriptionTitle,
            productCode: productValueCode,
            price: +productValuePrice, // convert from string to integer
            urlimage: productValueUrl,
            productName: productValue
        };

        try {
            setSpinner(true);

            await fetch('https://e-commerce-1a48a-default-rtdb.firebaseio.com/inputdata.json', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInputs)
            });

            setSpinner(false);

            resetInputFields();
        } catch (error) {
            console.log("error:", error);
        }
    }

    // another approach of resetting input fields after submit
    // const testHandler = (event) => {
    //     setInputObj(prevState => ({ ...prevState, [event.target.name]: event.target })); // shorter syntax of below
    //     /* setInputObj(prevState => {  
    //         return {
    //             ...prevState,
    //             [event.target.name]: event.target 
    //         };
    //     }); */
    // }

    const errorMessageName = !inputProduct && isBlurProduct ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';
    const errorMessageUrl = !inputProductUrl && isBlurProductUrl ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';
    const errorMessagePrice = !inputProductPrice && isBlurProductPrice ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';
    const errorMessageCode = !inputProductCode && isBlurProductCode ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';
    const errorMessageDescriptionTitle = !inputProductDescriptionTitle && isBlurProductDescriptionTitle ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';
    const errorMessageDescription = !inputProductDescription && isBlurProductDescription ? <p className={style.errorMessage}>Input field must not be empty.</p> : '';


    return (
        <section className="section-main">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 m-b-4">
                        <h4>Here you can add new products for Home page.</h4>
                    </div>
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={submitHandler}>

                            <div className={`form-input-set text-left m-b-2 ${errorMessageName && "decoration-negative"}`}>
                                <label htmlFor="name">Product name</label>
                                <input type="text" className="form-input" ref={el => inputRef.current['name'] = el} onChange={inputHandlerProduct} onBlur={onBlurHandlerProduct} name="name" id="name" placeholder="Product name" />
                                {errorMessageName}
                            </div>

                            <div className={`form-input-set text-left m-b-2 ${errorMessageUrl && "decoration-negative"}`}>
                                <label htmlFor="url">Image URL</label>
                                <input type="text" className="form-input" ref={el => inputRef.current['url'] = el} onChange={inputHandlerProductUrl} onBlur={onBlurHandlerProductUrl} name="url" id="url" placeholder="Image URL" />
                                {errorMessageUrl}
                            </div>

                            <div className={`form-input-set text-left m-b-2 ${errorMessagePrice && "decoration-negative"}`}>
                                <label htmlFor="price">Product price</label>
                                <input type="text" className="form-input" ref={el => inputRef.current['price'] = el} onChange={inputHandlerProductPrice} onBlur={onBlurHandlerProductPrice} name="price" id="price" placeholder="Product price" />
                                {errorMessagePrice}
                            </div>

                            <div className={`form-input-set text-left m-b-2 ${errorMessageCode && "decoration-negative"}`}>
                                <label htmlFor="code">Product code</label>
                                <input type="text" className="form-input" ref={el => inputRef.current['code'] = el} onChange={inputHandlerProductCode} onBlur={onBlurHandlerProductCode} name="code" id="code" placeholder="Product code" />
                                {errorMessageCode}
                            </div>

                            <div className={`form-input-set text-left m-b-2 ${errorMessageDescriptionTitle && "decoration-negative"}`}>
                                <label htmlFor="description">Description Title</label>
                                <input type="text" className="form-input" ref={el => inputRef.current['description'] = el} onChange={inputHandlerProductDescriptionTitle} onBlur={onBlurHandlerProductDescriptionTitle} name="description" id="description" placeholder="Product title" />
                                {errorMessageDescriptionTitle}
                            </div>

                            <div className="form-input-set text-left m-b-2">
                                <label htmlFor="fullDescription">Full description</label>
                                <textarea className="form-input" ref={el => inputRef.current['fullDescription'] = el} placeholder="Product description" onChange={inputHandlerProductDescription} onBlur={onBlurHandlerProductDescription} name="fullDescription" id="fullDescription" />
                                {errorMessageDescription}
                            </div>

                            <div className="form-input-set text-left">
                                <label htmlFor="selectbox" title="Select Box">Is product favorite</label>
                                <select className="form-select" ref={el => inputRef.current['favorite'] = el} onChange={inputHandlerProductFavorite} name="select" id="selectbox">
                                    <option value="true" defaultValue="">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            {
                                spinner ? (
                                    <Spinner />
                                ) : (
                                    <div className="col-md-12 text-center m-t-2">
                                        <button className="btn btn-brand">Send request</button>
                                    </div>
                                )
                            }

                            {/* another approach of resetting input fields after submit - html elements */}
                            {/* <div className='form-input-set'>
                                <label htmlFor="name2">Product name2</label>
                                <input type="text" className="form-input" onChange={testHandler} name="name2" id="name2" placeholder="Product name" />
                            </div>
                            <div className='form-input-set'>
                                <label htmlFor="url2">Image URL</label>
                                <input type="text" className="form-input" onChange={testHandler} name="url2" id="url2" placeholder="Image URL" />
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CreateProducts;