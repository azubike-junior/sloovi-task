import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, company_id } from "../../utils";
import { toggleTaskAdder } from "./AddTaskSlice";
import { getTasksFeature } from './GetTasksSlice';

export interface deleteTaskProps {
 task_id: string,
 dispatch: any
}

interface initState {
  error: any;
  loading: boolean;
  data: any;
  isSuccessful: boolean
}

const initialState: initState = {
  error: "",
  loading: false,
  data: [],
  isSuccessful: false,
};

export const deleteTaskFeature = createAsyncThunk(
  "task/deleteTask",
  async ({task_id, dispatch}: deleteTaskProps) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${baseUrl}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 204) {
        dispatch(toggleTaskAdder())
        dispatch(getTasksFeature())
        return response.data;
      }
    } catch (e: any) {
      return e.response.data;
    }
  }
);

const deleteTaskSlice = createSlice({
  name: "deleteTaskSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTaskFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(deleteTaskFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(deleteTaskFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default deleteTaskSlice.reducer;
