import {
  SET_SELECTED_CATEGORY,
  SET_SEARCH_RESULTS,
  SET_LOADING,
} from './action';

const initialState = {
  selectedCategory: 'All Categories',
  searchResults: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default reducer;