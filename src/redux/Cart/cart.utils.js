export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    return prevCartItems.find(
        carItem => carItem.documentID === nextCartItem.documentID
    )
}

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement =1;
    const carItemExists = existingCartItem({ prevCartItems, nextCartItem});

    if (carItemExists) {
        return prevCartItems.map(carItem =>
            carItem.documentID == nextCartItem.documentID
            ? {
                ...carItem,
                quantity: carItem.quantity + quantityIncrement
            } : carItem
        );
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
};

export const handleRemoveCartItem = ({
    prevCartItems,
    carItemToRemove
}) => {
    return prevCartItems.filter(item => item.documentID !== carItemToRemove.documentID);
}

export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
}) => {
    const existingCartItem = prevCartItems.find(cartItem =>
        cartItem.documentID === cartItemToReduce.documentID); 

        if(existingCartItem.quantity ===1){
            return prevCartItems.filter(
                cartItem => cartItem.documentID !== existingCartItem.documentID
            );
        }

        return prevCartItems.map(cartItem =>
            cartItem.documentID === existingCartItem.documentID ?
            {
                ...cartItem,
                quantity: cartItem.quantity -1
            } : cartItem)
};