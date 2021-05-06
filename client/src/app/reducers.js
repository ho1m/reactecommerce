import { combineReducers } from 'redux';
import appReducer from '../features/appSlice';
import cartReducer from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer
})

export default rootReducer;