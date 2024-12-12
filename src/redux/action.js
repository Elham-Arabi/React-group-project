export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_LOADING = 'SET_LOADING';

// Action to set selected category
export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category,
});

// Action to set search results
export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

// Action to set loading state
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
