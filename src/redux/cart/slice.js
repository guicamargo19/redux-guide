import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            //verificar se o produto já está no carrinho
            const productIsAlreadyInCart = state.products.some(
                (product) => product.id === action.payload.id
            );
            // se estiver, aumentar a qtde em 1
            if (productIsAlreadyInCart) {
                state.products = state.products.map((product) =>
                    product.id === action.payload.id
                        ? {...product, quantity: product.quantity + 1 }
                        : product
                    );

                return;
            }
            // se não estiver, adicioná-lo
            state.products = [...state.products, {...action.payload, quantity: 1}];
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        },
        increaseProduct: (state, action) => {
            state.products = state.products.map((product) =>
                product.id === action.payload
                    ? {...product, quantity: product.quantity + 1 }
                    : product
                );
            },
        decreaseProduct: (state, action) => {
            state.products = state.products.map((product) =>
                product.id === action.payload
                    ? {...product, quantity: product.quantity - 1 }
                    : product
                ).filter((product) => product.quantity > 0);
            }
        }
    })

export const {addProduct, increaseProduct, decreaseProduct, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;