import { createSlice } from '@reduxjs/toolkit';
import ecomAxios from '../../ecomAxios';

const initialState = {
  admin: null,
  token: null
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAdmin: (state, action) => { state.admin = action.payload;},
    removeAdmin: (state) => { state.admin = null; },
    setToken: (state, action) => { state.token = action.payload;},
    removeToken: (state) => { state.token = null; },
  },
});

export const { 
  setAdmin, removeAdmin,
  setToken, removeToken,
} = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;
export const selectToken = (state) => state.admin.token;

export const adminLogout = () => (dispatch, getState) => {
  dispatch(removeAdmin())
  dispatch(removeToken())
};
export const adminLogin = ({loginData, historyMethod}) => async (dispatch, getState) => {
  try {
    const loginRes = await ecomAxios.post('/admins/login', loginData)
    const { admin, token } = loginRes.data

    if (loginRes.statusText === 'OK') {
      historyMethod()
      dispatch(setAdmin(admin))
      dispatch(setToken(token))
    }
  } catch (error) {
    alert(error)
  }
};
export const adminRegister = ({ email, password, setMethod}) => async (dispatch, getState) => {
  try {
    const res = await ecomAxios.post('/admins/register', { email, password });
    if (res.status === 201) setMethod()
  } catch (error) {
    alert(error)
  }
};
export const orderStatusChange = ({ orderId, status, loadMethod }) => async (dispatch, getState) => {
  const token = selectToken(getState());
  try {
    await ecomAxios.patch(`/admins/order/${orderId}/status`, { status }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error.message)
  }
  loadMethod()
};
export const updateUser = ({ userId, userData }) => async (dispatch, getState) => {
  const token = selectToken(getState());
  try {
    await ecomAxios.patch(`/admins/user/${userId}`, userData, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(error)
  }
};

export default adminSlice.reducer;
