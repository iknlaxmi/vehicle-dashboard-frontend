import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllInventory = createAsyncThunk(
  "inventory/fetchAllInventory",
  async () => {
    const response = await axios.get("http://localhost:3021/api/inventory/all");

    return response.data;
  }
);

export const fetchFilterInventory = createAsyncThunk(
  "inventory/fetchFilterInventory",
  async (params) => {
    const response = await axios.get(
      "http://localhost:3021/api/inventory/filter",
      {
        params,
      }
    );
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
