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

export const getSingleTasksFeature = createAsyncThunk("task/getSingleTask", async (task_id: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${baseUrl}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`,
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
});

const getSingleTaskSlice = createSlice({
  name: "getSingleTaskSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleTasksFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(getSingleTasksFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(getSingleTasksFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default getSingleTaskSlice.reducer;
