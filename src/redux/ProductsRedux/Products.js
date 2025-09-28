import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/client'
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/Product/GetAll?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return res.data; // backend should return {items, totalPages, totalCount}
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk("products/fetchAllByCategory", async ({id}) => {
  const res = await api.get(`/Product/GetProductsByCategoryId/${id}`);
  return res.data;
});
export const fetchProductsBySubCategory = createAsyncThunk("products/fetchAllBySubCategory", async ({id}) => {
  const res = await api.get(`/Product/GetProductsBySubCategoryId/${id}`);
  return res.data;
});
export const fetchDiscountedProducts = createAsyncThunk(
  "products/fetchDiscounted",
  async ({ pageNumber = 1, pageSize = 8 }, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `product/GetAllDiscounts?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return res.data; // should include {items, totalPages, totalCount}
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch discounted products");
    }
  }
);


const productsSlice = createSlice({
  name: "products",
  initialState: {
    all: [],
    byCategory: [],
    bySubCategory: [],
    discounted: [],
    totalPages: 0,
    totalCount: 0,
    loading: {
      all: false,
      discounted: false,
      byCategory: false,
      bySubCategory: false,
    },
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 All products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading.all = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.all = false;
        state.all = action.payload.items || action.payload;
        state.totalPages = action.payload.totalPages || 1;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.all = false;
        state.error = action.payload || action.error.message;
      });

    // 🔹 Discounted products
    builder
      .addCase(fetchDiscountedProducts.pending, (state) => {
        state.loading.discounted = true;
        state.error = null;
      })
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => {
        state.loading.discounted = false;
        state.discounted = action.payload.items || action.payload;
        state.totalPages = action.payload.totalPages || 1;
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchDiscountedProducts.rejected, (state, action) => {
        state.loading.discounted = false;
        state.error = action.payload || action.error.message;
      });

    // 🔹 Category products
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading.byCategory = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading.byCategory = false;
        state.byCategory = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading.byCategory = false;
        state.error = action.payload || action.error.message;
      });

    // 🔹 Subcategory products
    builder
      .addCase(fetchProductsBySubCategory.pending, (state) => {
        state.loading.bySubCategory = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubCategory.fulfilled, (state, action) => {
        state.loading.bySubCategory = false;
        state.bySubCategory = action.payload;
      })
      .addCase(fetchProductsBySubCategory.rejected, (state, action) => {
        state.loading.bySubCategory = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products.all;
export const selectDiscountedProducts = (state) => state.products.discounted;
export const selectProductsByCategory = (state) => state.products.byCategory;
export const selectProductsBySubCategory = (state) => state.products.bySubCategory;