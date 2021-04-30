import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCart, getCheckedoutCarts, removeCart, removeOrders } from './cart/cartSlice';
import ecomAxios from '../ecomAxios';

const initialState = {
  user: null,
  token: null,
  currentCartId: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action) => { state.user = action.payload;},
    removeUser: (state) => { state.user = null; },
    setToken: (state, action) => { state.token = action.payload;},
    removeToken: (state) => { state.token = null; },
    setCurrentCartId: (state, action) => {
      state.currentCartId = action.payload;
    },
    removeCurrentCartId: (state) => {
      state.currentCartId = '';
    },
  },
});

export const { 
  setUser, removeUser,
  setToken, removeToken,
  setCurrentCartId, removeCurrentCartId
} = appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectToken = (state) => state.app.token;
export const selectCurrentCartId = (state) => state.app.currentCartId;

export const logout = () => (dispatch, getState) => {
  dispatch(removeUser())
  dispatch(removeToken())
  dispatch(removeCurrentCartId())
  dispatch(removeCart())
  dispatch(removeOrders())
};
export const login = ({loginData, historyMethod}) => async (dispatch, getState) => {
  try {
    const loginRes = await ecomAxios.post('/users/login', loginData)
    const { user, token, currentCart } = loginRes.data

    dispatch(setUser(user))
    dispatch(setToken(token))
    dispatch(setCurrentCartId(currentCart))
    dispatch(getCart())
    dispatch(getCheckedoutCarts())
    historyMethod()
  } catch (error) {
    console.error(error)
  }

};
export const register = ({registerData, historyMethod}) => async (dispatch, getState) => {
  try {
    await ecomAxios.post('/users/register', registerData);
    historyMethod();
  } catch (error) {
    console.error(error)
  }
};
export const updateUserCurrentCart = (cartId) => async (dispatch, getState) => {
  const user = selectUser(getState());
  const token = selectToken(getState());
  try {
    await ecomAxios.patch(`/users/updatecartid/${user._id}`, {
      current_cart: cartId
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.error(error)
  }
};


export default appSlice.reducer;
