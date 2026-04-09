import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { type RootState } from './index';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

interface ProductState {
    products: Product[]
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
}

const API_URL = '/api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
});


export const addProducts = createAsyncThunk(
    'products/addProducts', 
    async (newProduct: {
        name: string; 
        description: string; 
        price: number;
        imageUrl?: string;
    }) => {
        const response = await axios.post(API_URL, newProduct);
        return response.data;
    }
);

export const updateProducts = createAsyncThunk(
    'products/updateProducts', 
    async (updatedProduct: Product) => {
        const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
        return response.data;
    }
);

export const deleteProducts = createAsyncThunk(
    'products/deleteProducts', 
    async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })

            .addCase(addProducts.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.push(action.payload);
            })

            .addCase(addProducts.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add product';
            })

            .addCase(updateProducts.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            .addCase(updateProducts.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update product';
            })

            .addCase(deleteProducts.fulfilled, (state, action: PayloadAction<number>) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            })

            .addCase(deleteProducts.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete product';
            });
    }
});

export default productSlice.reducer;

export const selectProducts = (state: RootState) => state.products.products; 
export const selectLoading = (state: RootState) => state.products.loading; 
export const selectError = (state: RootState) => state.products.error;