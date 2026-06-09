import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// fetch cart from server
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/cart");
      // server returns array of cart docs with populated product
      return res.data.map((c) => ({ ...c.product, quantity: c.quantity, cartItemId: c._id }));
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// add to cart (server)
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await api.post("/cart", { productId: product._id, quantity });
      const c = res.data;
      return { ...c.product, quantity: c.quantity, cartItemId: c._id };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// update quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/cart/${cartItemId}`, { quantity });
      const c = res.data;
      return { ...c.product, quantity: c.quantity, cartItemId: c._id };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// remove from cart
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async ({ cartItemId }, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/${cartItemId}`);
      return cartItemId;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // local clear (used after order)
    clearCart(state) {
      state.items = [];
    },
    // fallback local action to set items (not used widely)
    setCartItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addToCartAsync.fulfilled, (state, action) => {
        const existing = state.items.find((it) => it._id === action.payload._id);
        if (existing) {
          existing.quantity = action.payload.quantity;
          existing.cartItemId = action.payload.cartItemId;
        } else {
          state.items.push(action.payload);
        }
      })

      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const idx = state.items.findIndex((it) => it.cartItemId === action.payload.cartItemId);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })

      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((it) => it.cartItemId !== action.payload);
      });
  },
});

export const { clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;

