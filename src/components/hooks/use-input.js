import { useState } from 'react';


const useInput = (inputType) => {

    const [value, setValue] = useState('');
    const [blur, setBlur] = useState(false);

    function validate (type) {

        let isValid = false;

        if (type === 'default' || type === 'name' || type === 'surname' || type === 'address') {
            isValid = value.trim().length > 0;
        }
        if(type === 'zipcode') {
            isValid = value.trim().length >= 5 && value.trim().length <= 5;
        }
        if(type === 'email') {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            isValid = emailRegex.test(String(value).toLowerCase());
        }
        if(type === 'checkbox') {
            isValid = value; // true or false getting from bottom checkboxHandler()
        }

        return isValid;
    }

    const isInputValid = validate(inputType);
    const isBlur = !isInputValid && blur; // blur is initial false and once clicked inside input always is true

    const inputHandler = (event) => {
        setValue(event.target.value);
    }

    const checkboxHandler = (event) => {
        setValue(event.target.checked); // true/false
    }

    const onBlurHandler = () => {
        setBlur(true);
    }

    return {
        value,
        isInputValid,
        isBlur,
        inputHandler,
        onBlurHandler,
        checkboxHandler
    };

}

export default useInput;