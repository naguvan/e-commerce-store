import React from 'react';

import CartActionTypes from './cart.types'
import { addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart} from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
    successMessage: false
}

const cartReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...currentState,
                hidden: !currentState.hidden
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...currentState,
                cartItems: addItemToCart(currentState.cartItems, action.payload),
                successMessage: true
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...currentState,
                cartItems: removeItemFromCart(currentState.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...currentState,
                cartItems: clearItemFromCart(currentState.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_CART:
            return {
              ...currentState,
            cartItems: []
            }
        default:
            return currentState;
    }
}

export default cartReducer