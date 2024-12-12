import { createStore } from 'redux';
import reducer from './reducer'; 

const store = createStore(reducer);
const initialState = {
    categories: ['Hot Deals', 'Laptops', 'Smartphones', 'Cameras', 'Accessories'],
    information: ['About Us', 'Contact Us', 'Privacy Policy', 'Orders and Returns', 'Terms & Conditions'],
    service: ['My Account', 'View Cart', 'Wishlist', 'Track My Order', 'Help'],
  };
  const footerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_CATEGORIES':
        return {
          ...state,
          categories: action.payload,
        };
        case 'UPDATE_INFORMATION':
            return {
              ...state,
              information: action.payload,
            };
      
          case 'UPDATE_SERVICE':
            return {
              ...state,
              service: action.payload,
            };
      
          default:
            return state;
        }
      };
export default store;