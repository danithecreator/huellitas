import React, { useState, useEffect } from "react";
import FormInput from './../forms/formInput/FormInput';
import Button from './../forms/button/Button';
import './payment.css';
import { selectCartTotal, selectCartItemsCount} from './../../redux/Cart/cart.selectors';
import { clearCart } from './../../redux/Cart/cart.actions'; 
import { createStructuredSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const initialAddresState = {
    line1: '',
    line2: '',
};

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount
});

const PaymentDetails = () => {
    const history= useHistory();
    const { total, itemCount } = useSelector(mapState);
    const dispatch = useDispatch();
    const [billingAddress, setBillingAddress] = useState({ ...initialAddresState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddresState });
    const [recipientName, setRecipientName] = useState('');
    const [nameOnCard, setNameOncard] = useState('');

    useEffect(() =>{
        if(itemCount<1) {
            history.push('/');
        }
    }, [itemCount]);

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };
 
    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        });
    };

    const handleFormSubmit = async evt => {
        evt.preventDefault();

        if(
            !shippingAddress.line1 || !billingAddress.line1||
            !recipientName || !nameOnCard
        ){
            return;
        }

        dispatch(clearCart())
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>

                <div className="container">
                    <h2>
                        Dirección de Envio
                    </h2>

                    <FormInput
                        required
                        placeholder="Nombre del destinatario"
                        name="recipientName"
                        handleChange={evt => setRecipientName(evt.target.value)}
                        value={recipientName}
                        type="text">
                    </FormInput>

                    <FormInput
                        required
                        placeholder="Linea 1"
                        name="line1"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line1}
                        type="text">
                    </FormInput>

                    <FormInput
                        placeholder="Linea 2"
                        name="line2"
                        handleChange={evt => handleShipping(evt)}
                        value={shippingAddress.line2}
                        type="text">
                    </FormInput>

                </div>

                <div className="container">
                    <h2>
                        Dirección de cobro
                    </h2>

                    <FormInput
                        required
                        placeholder="Nombre en la tarjeta"
                        name="nameOnCard"
                        handleChange={evt => setNameOncard(evt.target.value)}
                        value={nameOnCard}
                        type="text">
                    </FormInput>

                    <FormInput
                        required
                        placeholder="Linea 1"
                        name="line1"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line1}
                        type="text">
                    </FormInput>

                    <FormInput
                        placeholder="Linea 2"
                        name="line2"
                        handleChange={evt => handleBilling(evt)}
                        value={billingAddress.line2}
                        type="text">
                    </FormInput>

                </div>

                <div className="container">
                    <h2>
                        Detalle de tarjeta
                    </h2>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Número de tarjeta</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" required/>
                    </div>

                    <button type="submit" className="btn btn-secondary">Realizar Pago</button>
                </div>

            </form>            
        </div>
    )
}

export default PaymentDetails;