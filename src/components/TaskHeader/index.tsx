import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleTaskAdder } from "../../Redux/Features/AddTaskSlice";
import { getUserDetailsFeature } from "../../Redux/Features/GetAssignedUserDetails";
import { updateToggle } from "../../Redux/Features/UpdateTaskSlice";
import { RootState } from "../../Redux/store";
import { getTasksFeature } from "./../../Redux/Features/GetTasksSlice";

const TaskHeader = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.getTasks);

  return (
    <div className="flex w-96 h-12 border border-stone-300 rounded-sm justify-between bg-slate-50 items-center">
      <span className="pl-2 text-sm">
        TASKS <span className="">{data?.length}</span>
      </span>
      <span
        onClick={() => {
          dispatch(updateToggle(false));
          dispatch(getTasksFeature());
          dispatch(toggleTaskAdder());
          dispatch(getUserDetailsFeature());
        }}
        className="px-3 h-12 pt-1 text-2xl cursor-pointer border border-r-0 border-y-0 border-stone-300"
      >
        +
      </span>
    </div>
  );
};

export default TaskHeader;
