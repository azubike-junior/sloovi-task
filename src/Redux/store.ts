import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunkMiddleware from "redux-thunk";
import AddTaskReducer from "./Features/AddTaskSlice";
import LoginReducer from "./Features/LoginSlice";
import type {} from "redux-thunk/extend-redux";
import GetTasksReducer from "./Features/GetTasksSlice";
import UpdateTaskReducer from "./Features/UpdateTaskSlice";
import GetSingleTaskReducer from "./Features/GetSingleTaskSlice";
import getUserDetailsReducer from "./Features/GetAssignedUserDetails";

export const store = configureStore({
  reducer: {
    login: LoginReducer,
    addTask: AddTaskReducer,
    getTasks: GetTasksReducer,
    updateTask: UpdateTaskReducer,
    getSingleTask: GetSingleTaskReducer,
    getUserDetails: getUserDetailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
