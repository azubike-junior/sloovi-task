import React, { FC, useEffect, useState } from "react";
import { InputField, SelectField } from "../InputField";
import TaskHeader from "./../TaskHeader/index";
import { RiCalendarEventLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "../Button";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AddedTasks } from "../AddedTasks";
import { convertTimeToSeconds, convertTimeZoneSeconds } from "../../utils";
import {
  addTaskFeature,
  toggleTaskAdder,
} from "../../Redux/Features/AddTaskSlice";
import Loader from "../Loader";
import { convertSecondsToTimeFormat } from "./../../utils/index";
import { deleteTaskFeature } from "../../Redux/Features/DeleteTaskFeature";
import {
  updateTaskFeature,
  updateToggle,
} from "../../Redux/Features/UpdateTaskSlice";
import { getUserDetailsFeature } from "./../../Redux/Features/GetAssignedUserDetails";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const TaskAdder: FC<{}> = () => {
  const dispatch = useDispatch();
  const { openTask, loading: addTaskLoading } = useSelector(
    (state: RootState) => state.addTask
  );
  const { toggleUpdate, loading: updateTaskLoading } = useSelector(
    (state: RootState) => state.updateTask
  );
  const { data, loading: singleTaskLoading } = useSelector(
    (state: RootState) => state.getSingleTask
  );
  const { data: userDetails } = useSelector(
    (state: RootState) => state.getUserDetails
  );

  const [taskData, setTaskData] = useState<{
    task_msg: string;
    task_date: string;
    task_time: string;
    assigned_user: string;
  }>({ task_msg: "", task_date: "", task_time: "", assigned_user: "" });

  const handleChange = (e: InputEvent) => {
    const value = e.target.value;
    setTaskData({
      ...taskData,
      [e.target.name]: value,
    });
  };

  const taskHandler = () => {
    const { task_msg, task_time, task_date, assigned_user } = taskData;
    if (!task_msg || !task_time || !task_date || !assigned_user) {
      return;
    }

    const data = {
      assigned_user,
      task_date,
      task_time: convertTimeToSeconds(task_time),
      task_msg,
      is_completed: 0,
      time_zone: convertTimeZoneSeconds(task_date),
      setTaskData,
      dispatch,
    };
    dispatch(addTaskFeature(data));
  };

  const updateTaskHandler = () => {
    const updatedData = {
      assigned_user: userDetails?.data[0].id,
      task_date: taskData.task_date ? taskData.task_date : data.task_date,
      task_time: taskData.task_time
        ? convertTimeToSeconds(taskData.task_time)
        : data.task_time,
      task_msg: taskData.task_msg ? taskData.task_msg : data.task_msg,
      is_completed: 0,
      time_zone: convertTimeZoneSeconds(data.task_date),
      dispatch,
      id: data.id,
    };

    dispatch(updateTaskFeature(updatedData));
  };

  const deleteParam = {
    task_id: data?.id,
    dispatch,
  };

  const displaySaveBtn = () => {
    if (addTaskLoading) {
      return <Loader />;
    } else {
      return "Save";
    }
  };

  const displayUpdateBtn = () => {
    if (updateTaskLoading) {
      return <Loader />;
    } else {
      return "Update";
    }
  };

  useEffect(() => {
    dispatch(getUserDetailsFeature());
  }, []);


  return (
    <div className="bg-cyan-50 w-96 h-500 mt-28 mx-auto md:ml-10 overflow-auto">
      <TaskHeader />
      {openTask ? (
        <div className="px-2 w-96 border-stone-300 rounded-sm">
          {singleTaskLoading ? (
            <Loader />
          ) : (
            <form
              // onSubmit={toggleUpdate ? updateTaskHandler : taskHandler}
              className="w-full"
            >
              <InputField
                name="task_msg"
                type="text"
                className="w-full py-2 px-3 outline-none "
                label="Text Description"
                icon={<RiCalendarEventLine />}
                child={taskData?.task_msg}
                onChange={handleChange}
                value={data?.task_msg}
                toggleUpdate={toggleUpdate}
              />

              <div className="flex ">
                <InputField
                  name="task_date"
                  type="date"
                  className="w-full py-2 px-3 outline-none "
                  label="Date"
                  child={taskData?.task_date}
                  onChange={handleChange}
                  value={data?.task_date}
                  toggleUpdate={toggleUpdate}
                />
                <InputField
                  name="task_time"
                  type="time"
                  className="w-full py-2 px-3 outline-none "
                  label="Time"
                  child={taskData?.task_time}
                  onChange={handleChange}
                  value={convertSecondsToTimeFormat(data?.task_time)}
                  toggleUpdate={toggleUpdate}
                />
              </div>

              <SelectField
                name="assigned_user"
                type="text"
                className="w-full py-2 px-3 outline-none "
                label="Assign User"
                onChange={handleChange}
                value={data?.assigned_user_name}
                user_id={data?.user_id}
                toggleUpdate={toggleUpdate}
                options={userDetails?.data}
              />

              <div className="flex pt-7 pr-3 justify-end items-center">
                {toggleUpdate && (
                  <div
                    onClick={() => dispatch(deleteTaskFeature(deleteParam))}
                    className="pl-5"
                  >
                    <BsFillTrashFill className="cursor-pointer text-xl text-gray-400" />
                  </div>
                )}
                <div className="flex justify-end pl-32">
                  <Button
                    type="button"
                    child="Cancel"
                    onClick={() => {
                      dispatch(toggleTaskAdder());
                      updateToggle(false);
                      setTaskData({
                        task_msg: "",
                        task_date: "",
                        task_time: "",
                        assigned_user: "",
                      });
                    }}
                    className="text-base pr-7"
                  />
                  <Button
                    onClick={() => {
                      toggleUpdate ? updateTaskHandler() : taskHandler();
                    }}
                    type="button"
                    child={toggleUpdate ? displayUpdateBtn() : displaySaveBtn()}
                    className="text-base bg-green-500 px-8 py-1.5 rounded-md text-white"
                  />
                </div>
              </div>
            </form>
          )}
        </div>
      ) : (
        <AddedTasks />
      )}
    </div>
  );
};

// RiCalendarEventLine;

export default TaskAdder;
