import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, company_id } from "../../utils";

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

export const getUserDetailsFeature = createAsyncThunk(
  "team/getUserDetails",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/team?product=outreach&company_id=${company_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 200) {
        return response?.data?.results;
      }
    } catch (e: any) {
      return e.response.data;
    }
  }
);

const getUserDetailsSlice = createSlice({
  name: "getUserDetailSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetailsFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getUserDetailsFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getUserDetailsFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default getUserDetailsSlice.reducer;
