const initialProduct = [

    // input fields examples
    {
        elementID: "blank",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'No validation field'
        },
        value: '',
        validation: {
            required: false  // if set "false" skip validation 
        },
        valid: true,    // if validation skipped set valit: true
        error: false,
        errorMessage: "",
        labelTitle: 'No validation',
        databaseName: 'noValidate'
    },
    {
        elementID: "name",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your name'
        },
        value: '',
        validation: {
            required: true  // if set "false" skip validation 
        },
        valid: false,   // initially element valid set to false
        error: false,
        errorMessage: "Insert your name please.",
        labelTitle: 'Name',
        databaseName: 'name'
    },
    {
        elementID: "email",
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your email'
        },
        value: '',
        validation: {
            required: true,
            validRegex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        },
        valid: false,
        error: false,
        errorMessage: "Invalid e-mail address.",
        labelTitle: 'E-mail address',
        databaseName: 'email'
    },
    {
        elementID: "street",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Your street'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        error: false,
        errorMessage: "Please insert your street address.",
        labelTitle: 'Street number',
        databaseName: 'street'
    },
    {
        elementID: "zipcode",
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Your zipcode'
        },
        value: '',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 5
        },
        valid: false,
        error: false,
        errorMessage: "Your zipcode must have 5 numbers.",
        labelTitle: 'Zipcode',
        databaseName: 'zipcode'
    },
    {
        elementID: "comment",
        elementType: 'textarea',
        elementConfig: {
            placeholder: 'Your comment...'
        },
        value: 'Default text...',
        validation: {
            required: false
        },
        valid: true,
        error: false,
        labelTitle: 'User comment',
        databaseName: 'comment'
    },

    // dropdown example
    {
        elementID: "deliveryMethod",
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'fastest', displayName: 'Fastest' },
                { value: 'cheapest', displayName: 'Cheapest' },
                { value: 'lowest', displayName: 'Disabled option', disabled: true }
            ]
        },
        value: 'fastest', // initial value
        validation: {
            required: false
        },
        valid: true, // select element is always 
        labelTitle: 'Selectbox',
        databaseName: 'dropdown'
    },
    
    // checkbox examples
    {
        elementID: "checkbox",
        elementType: 'checkbox',
        elementConfig: {
            type: 'checkbox'
        },
        value: 'cb0',
        validation: {
            required: false     // if set "false" skip validation
        },
        valid: true,           // if skip validation set valid to "true"
        error: false,
        checked: false,
        disabled: false,
        labelTitle: 'Checkbox title',
        databaseName: 'checkbox'
    },
    {
        elementID: "checkbox1",
        elementType: 'checkbox',
        elementConfig: {
            type: 'checkbox'
        },
        value: 'cb1',
        validation: {
            required: true     // if set "false" skip validation
        },
        valid: false,        // initially checkbox element valid set to false
        error: false,       // initially error element valid set to false
        errorMessage: "You must agree with terms and conditions!", // error message
        checked: false,     // is checkbox checked or not(set "false") 
        disabled: false,    // is checkbox disabled or not(set "false") 
        labelTitle: 'Checkbox title1',
        databaseName: 'checkbox1'
    },
    {
        elementID: "checkbox2",
        elementType: 'checkbox',
        elementConfig: {
            type: 'checkbox'
        },
        value: 'cb2',
        validation: {
            required: true
        },
        valid: true,        // set to "true" if you want initial checkbox checked
        error: false,
        checked: true,      // if element is predefined checked, upper "valid" property must set to "true"
        disabled: false,
        labelTitle: 'Checkbox title2',
        databaseName: 'checkbox2'
    },
    {
        elementID: "checkbox3",
        elementType: 'checkbox',
        elementConfig: {
            type: 'checkbox'
        },
        value: 'cb3',
        validation: {
            required: true
        },
        valid: true,
        error: false,
        checked: true,      // predefined checked checkbox 
        disabled: true,     // predefined disabled checkbox 
        labelTitle: 'Checkbox title3',
        databaseName: 'checkbox3'
    },

    // radio buttons examples
    {
        elementID: "radio1",
        elementType: 'radio',
        elementConfig: {
            type: 'radio'
        },
        value: 'rb1',
        validation: {
            required: false     // if set "false" skip validation
        },
        valid: true,
        checked: false,
        disabled: false,
        labelTitle: 'Radio button 1',
        databaseName: 'radio1'
    },
    {
        elementID: "radio2",
        elementType: 'radio',
        elementConfig: {
            type: 'radio'
        },
        value: 'rb2',
        validation: {
            required: false     // if set "false" skip validation
        },
        valid: true,
        checked: false,
        disabled: false,
        labelTitle: 'Radio button 2',
        databaseName: 'radio2'
    },
    {
        elementID: "radio3",
        elementType: 'radio',
        elementConfig: {
            type: 'radio'
        },
        value: 'rb3',
        validation: {
            required: false     // if set "false" skip validation
        },
        valid: true,
        checked: true,
        disabled: false,
        labelTitle: 'Radio button 3',
        databaseName: 'radio3'
    }

];

export default initialProduct;