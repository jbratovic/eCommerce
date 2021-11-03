const initialProduct = [

    // input fields examples

    {
        elementID: "title",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Product title'
        },
        value: '',
        validation: {
            required: true  // if set "false" skip validation 
        },
        valid: false,   // initially element valid set to false
        error: false,
        errorMessage: "Insert Product title name please.",
        labelTitle: 'Product Name',
        databaseName: 'productName'
    },
    {
        elementID: "image",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Image URL'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        error: false,
        errorMessage: "Insert Image URL please.",
        labelTitle: 'Image URL',
        databaseName: 'urlimage'
    },
    {
        elementID: "price",
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Product price'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        error: false,
        errorMessage: "Insert Product price please.",
        labelTitle: 'Product Price',
        databaseName: 'price'
    },
    {
        elementID: "code",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Product code'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        error: false,
        errorMessage: "Insert Product code please.",
        labelTitle: 'Product code',
        databaseName: 'productCode'
    },
    {
        elementID: "descTitle",
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Description title'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        error: false,
        errorMessage: "Insert Description title please.",
        labelTitle: 'Description title',
        databaseName: 'descriptionTitle' 
    },
    {
        elementID: "description",
        elementType: 'textarea',
        elementConfig: {
            placeholder: 'Product description'
        },
        value: '',
        validation: {
            required: false
        },
        valid: true,
        error: false,
        labelTitle: 'Description',
        databaseName: 'comment'
    },
    {
        elementID: "deliveryMethod",
        elementType: 'select',
        elementConfig: {
            options: [
                { value: 'true', displayName: 'True' },
                { value: 'false', displayName: 'False' }
            ]
        },
        value: 'true', // initial value
        validation: {
            required: false
        },
        valid: true, // select element is always 
        labelTitle: 'Is favourite - initial value',
        databaseName: 'isFavourite'
    }

];

export default initialProduct;