import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STORAGE_KEY = "shopping_products";

// Load products from local storage if they exist
const loadProductsFromStorage = () => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (serializedData === null) {
      return [];
    }
    return JSON.parse(serializedData);
  } catch (e) {
    console.error("Could not load products from storage:", e);
    return [];
  }
};

// Save products to local storage
const saveProductsToStorage = (products) => {
  try {
    const serializedData = JSON.stringify(products);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (e) {
    console.error("Could not save products to storage:", e);
  }
};

const initialState = {
  isLoading: false,
  productList: loadProductsFromStorage(),
  productDetails: null,
};

// Async action to fetch products from the server
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/shop/products/get"
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        saveProductsToStorage(state.productList); // Save to storage after fetching
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        saveProductsToStorage(state.productList); // Save to storage after fetching
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
