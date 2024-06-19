// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  userInputs: {
    // Define initial user input state here
  },
  apiData: {
    // Define initial API response state here
    articles: [],
    loading: false,
    error: null,
  },
};

// Define reducers and actions using createSlice
const apiDataSlice = createSlice({
  name: 'apiData',
  initialState: initialState.apiData,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Configure store with slices
const store = configureStore({
  reducer: {
    apiData: apiDataSlice.reducer,
  },
});

export const { setLoading, setArticles, setError } = apiDataSlice.actions;

export default store;
