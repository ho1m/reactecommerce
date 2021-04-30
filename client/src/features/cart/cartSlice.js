import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeCurrentCartId, selectCurrentCartId, selectToken, selectUser, setCurrentCartId, updateUserCurrentCart } from '../appSlice';
import ecomAxios from '../../ecomAxios';

const initialState = {
  cart: null,
  orders: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    removeCart: (state) => { state.cart = null; },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    removeOrders: (state) => { state.orders = []; },
  },
});

export const { setCart, setOrders, removeCart, removeOrders } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectOrders = (state) => state.cart.orders;

export const getCart = () => async (dispatch, getState) => {
  const currentCartId = selectCurrentCartId(getState());
  if (!currentCartId) return;
  try {
    const cartRes = await ecomAxios.get(`/carts/one/${currentCartId}`)
    dispatch(setCart(cartRes.data))
  } catch (error) {
    console.error(error)
  }
};
export const updateProductInCart = ({ type, productId }) => async (dispatch, getState) => {
  const currentCartId = selectCurrentCartId(getState());
  const cart = selectCart(getState());
  try {
    if (!currentCartId) return
    if (cart.products.find(({ product }) => product._id === productId).quantity === 1 && type === 'sub') {
      dispatch(deleteProductFromCart(productId))
    } else {
      await ecomAxios.patch(`/carts/${currentCartId}/products/${productId}/${type}`)
    }
    dispatch(getCart())
  } catch (error) {
    console.error(error)
  }
};
export const deleteProductFromCart = (productId) => async (dispatch, getState) => {
  const currentCartId = selectCurrentCartId(getState());
  try {
    await ecomAxios.delete(`/carts/${currentCartId}/products/${productId}`)
    dispatch(getCart())
  } catch (error) {
    console.error(error)
  }
};
export const addProductToCart = ({ product: { _id, name, desc, shortDesc, image, price, category } }) => async (dispatch, getState) => {
  const currentCartId = selectCurrentCartId(getState());
  const cart = selectCart(getState());
  try {
    const product = {
      _id, name, desc, shortDesc, image, price, category
    }
    if (!currentCartId) {
      dispatch(createCart(product))
    } else {
      if (cart.products.find(({ product }) => product._id === _id)) {
        dispatch(updateProductInCart({ type: 'add', productId: _id }))
      } else {
        await ecomAxios.patch(`/carts/${currentCartId}/products/create`, product)
      }
    }
    dispatch(getCart())
  } catch (error) {
    console.error(error)
  }
};
export const createCart = (product) => async (dispatch, getState) => {
  const user = selectUser(getState());
  try {
    const cartRes = await ecomAxios.post('/carts/create', {
      user_id: user ? user._id : '',
      products: [{ product, quantity: 1 }]
    })
    if (user) dispatch(updateUserCurrentCart(cartRes.data._id))
    // currentCartId = cartRes.data._id
    dispatch(setCurrentCartId(cartRes.data._id))
    dispatch(getCart())
  } catch (error) {
    console.error(error)
  }
};
export const cartCheckedOut = () => async (dispatch, getState) => {
  const currentCartId = selectCurrentCartId(getState());
  const user = selectUser(getState());
  try {
    if (!currentCartId) return
    await ecomAxios.patch(`/carts/checkedout/${currentCartId}`)
    if (user) {
      dispatch('updateUserCurrentCart', { cartId: '' })
      dispatch('getCheckedoutCarts')
    }
    dispatch(removeCart())
    dispatch(removeCurrentCartId())
    dispatch(getCart())
  } catch (error) {
    console.error(error)
  }
};
export const getCheckedoutCarts = () => async (dispatch, getState) => {
  const user = selectUser(getState());
  const token = selectToken(getState());
  try {
    if (!user) return
    const res = await ecomAxios.get(`/carts/checkedout/${user._id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    dispatch(setOrders(res.data))
  } catch (error) {
    console.error(error)
  }
};

export default cartSlice.reducer;
