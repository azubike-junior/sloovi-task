import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, company_id } from "../../utils";
import { toggleTaskAdder } from "./AddTaskSlice";
import { getTasksFeature } from "./GetTasksSlice";

export interface UpdateTaskProps {
  assigned_user: string;
  task_date: string;
  task_time: number;
  is_completed: number;
  time_zone: number;
  task_msg: string;
  dispatch?: any;
  id?: string;
}

interface initState {
  error: any;
  loading: boolean;
  data: any;
  isSuccessful: boolean;
  toggleUpdate: boolean;
}

const initialState: initState = {
  error: "",
  loading: false,
  data: {},
  isSuccessful: false,
  toggleUpdate: false,
};

export const updateTaskFeature = createAsyncThunk(
  "task/updateTask",
  async (data: UpdateTaskProps, { rejectWithValue }) => {
    const { dispatch, id, ...rest } = data;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseUrl}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`,
        rest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 202) {
        dispatch(getTasksFeature());
        dispatch(toggleTaskAdder());
        dispatch(updateToggle(false));
        return response?.data?.results;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const updateTaskSlice = createSlice({
  name: "updateTaskSlice",
  initialState,
  reducers: {
    updateToggle(state: initState, action: PayloadAction<boolean>) {
      state.toggleUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTaskFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(updateTaskFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(updateTaskFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const { updateToggle } = updateTaskSlice.actions;
export default updateTaskSlice.reducer;
