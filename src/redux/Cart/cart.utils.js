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