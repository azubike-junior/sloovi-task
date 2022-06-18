import React, { useState } from "react";
import { GoBell } from "react-icons/go";
import { GrFormCheckmark } from "react-icons/gr";
import { MdOutlineModeEdit } from "react-icons/md";
import asset1 from "../../assets/website 2.png";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toggleTaskAdder } from "../../Redux/Features/AddTaskSlice";
import { updateToggle } from "../../Redux/Features/UpdateTaskSlice";
import { useDispatch } from "react-redux";
import { getSingleTasksFeature } from "./../../Redux/Features/GetSingleTaskSlice";
import Loader from "./../Loader/index";

export const AddedTasks = () => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const { data, loading } = useSelector((state: RootState) => state.getTasks);
  return (
    <>
      {loading && <Loader />}
      {!data ? (
        <p>No Tasks Yet</p>
      ) : (
        data?.map((item: any) => {
          return (
            <div
              key={item.id}
              className="flex container  cursor-pointer justify-between items-center px-4 w-96 h-20 border border-t-0 bg-white border-stone-300 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-sm" src={asset1} alt="" />
                <div>
                  <h5>{item.task_msg}</h5>
                  <p className=" text-orange-500">{item.task_date}</p>
                </div>
              </div>

              <div className="flex px-1 justify-end items-center h-8 w-36 rounded">
                <div
                  onClick={() => {
                    dispatch(getSingleTasksFeature(item.id));
                    dispatch(updateToggle(true));
                    dispatch(toggleTaskAdder());
                  }}
                  className="editBtn mr-4 border-2 h-8 p-2 rounded "
                >
                  <MdOutlineModeEdit className="editBtn" />
                </div>

                <div className="flex px-1 justify-between items-center h-8 border-2  rounded">
                  <div className="flex px-1 items-center cursor-pointer ">
                    <GoBell />
                  </div>
                  <div className="w-0.5 h-8 bg-stone-200"></div>
                  <div className="flex px-1 items-center cursor-pointer">
                    <GrFormCheckmark className="text-lg " />
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
