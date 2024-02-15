import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiBaseUrl = "http://localhost:8083/api/car";

export const getCarTypes = createAsyncThunk("cars/getCarTypes", async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/types`);
    console.log({ response });
    return response.data.types;
  } catch (error) {
    console.log("Error geting car types", error);
  }
});

export const getCarBrands = createAsyncThunk("cars/getCarBrands", async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/brands`);
    return response.data.brands;
  } catch (error) {
    console.error("Error geting car Brands", error);
  }
});

export const getCarModels = createAsyncThunk(
  "cars/getCarModels",
  async (parameters) => {
    const { brand } = parameters;
    try {
      const response = await axios.get(`${apiBaseUrl}/models?brand=${brand}`);
      return response.data.models;
    } catch (error) {
      console.error("Error geting car Models", error);
    }
  }
);

export const carInfoSlice = createSlice({
  name: "cars",
  initialState: {
    types: [],
    brands: [],
    models: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCarTypes.fulfilled, (state, action) => {
      state.types = action.payload;
    });
    builder.addCase(getCarBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(getCarModels.fulfilled, (state, action) => {
      state.models = action.payload;
    });
  },
});

export const getTypes = (state) => state.carInfo.types;
export const getBrands = (state) => state.carInfo.brands;
export const getModels = (state) => state.carInfo.models;

export default carInfoSlice.reducer;
