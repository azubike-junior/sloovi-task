import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, company_id } from "../../utils";
import { getTasksFeature } from "./GetTasksSlice";

export interface AddTaskProps {
  assigned_user: string;
  task_date: string;
  task_time: number;
  is_completed: number;
  time_zone: number;
  task_msg: string;
  dispatch?: any;
  setTaskData?: any;
}

interface initState {
  error: any;
  loading: boolean;
  data: any;
  isSuccessful: boolean;
  openTask: boolean;
}

const initialState: initState = {
  error: "",
  loading: false,
  data: [],
  isSuccessful: false,
  openTask: true,
};

export const addTaskFeature = createAsyncThunk(
  "task/addTask",
  async (
    { dispatch, setTaskData, ...data }: AddTaskProps,
    { rejectWithValue }
  ) => {
    console.log(">>>>data for feture", data)
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${baseUrl}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.code === 201) {
        setTaskData({
          task_msg: "",
          task_date: "",
          task_time: "",
          assigned_user: "",
        });
        dispatch(toggleTaskAdder());
        dispatch(getTasksFeature());
        return response.data;
      }
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

const addTaskSlice = createSlice({
  name: "addTaskSlice",
  initialState,
  reducers: {
    toggleTaskAdder(state: initState) {
      state.openTask = !state.openTask;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTaskFeature.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isSuccessful = false;
    });
    builder.addCase(addTaskFeature.fulfilled, (state, action) => {
      state.loading = true;
      state.data = action.payload;
      state.loading = false;
      state.isSuccessful = true;
      state.error = "";
    });
    builder.addCase(addTaskFeature.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export const { toggleTaskAdder } = addTaskSlice.actions;
export default addTaskSlice.reducer;
