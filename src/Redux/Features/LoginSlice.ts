import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils";

export interface LoginProps {
  email: string;
  password: string;
  navigate: any;
}

interface initState {
  error: any;
  loading: boolean;
  data: any;
  isSuccessful: boolean;
}

const initialState: initState = {
  error: "",
  loading: false,
  data: {},
  isSuccessful: false,
};

export const loginFeature = createAsyncThunk(
  "task/login",
  async ({ email, password, navigate }: LoginProps, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      if (response.data.code === 200) {
        localStorage.setItem("token", response.data.results.token);
        localStorage.setItem("user_id", response.data.results.user_id);
        navigate("/tasks");
        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(loginFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(loginFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default loginSlice.reducer;
