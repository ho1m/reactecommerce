import { combineReducers } from 'redux';
import appReducer from '../features/appSlice';
import cartReducer from '../features/cart/cartSlice';
import adminReducer from '../features/admin/adminSlice';

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  admin: adminReducer
})

export default rootReducer;