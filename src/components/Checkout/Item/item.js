import React from "react";
import Table from 'react-bootstrap/Table';
import './item.css';
import { useDispatch } from 'react-redux';
import { removeCartItem, addProduct, reduceCartItem } from "../../../redux/Cart/cart.actions";

const Item = (product) => {
    const dispatch = useDispatch();
    const {
        productName,
        productThumbnail,
        productSellPrice,
        quantity,
        documentID
    }= product;

    const handleRemoveCartItem = (documentID) => {
        dispatch(
            removeCartItem({
                documentID
            })
        );
    }

    const handleAddProduct = (product) => {
        dispatch(
            addProduct(product)
        )
    }

    const handleReduceItem = (product) => {
        dispatch(
            reduceCartItem(product)
        );
    }

    return (
        <table className="table">
            <thead>
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Eliminar</th>
                    </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <img class='img-item' src={productThumbnail} alt={productName}></img>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <span className="cartBtn"
                            onClick={() => handleReduceItem(product)}>
                            {'<'}
                        </span>
                        <span>
                            {quantity}
                        </span>
                        <span className="cartBtn"
                            onClick={()=> handleAddProduct(product)}>
                            {'>'}
                        </span>
                    </td>
                    <td>
                        ${productSellPrice}
                    </td>
                    <td align="center">
                        <span className="cartBtn" onClick={()=> handleRemoveCartItem(documentID)}>
                            X
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Item; 