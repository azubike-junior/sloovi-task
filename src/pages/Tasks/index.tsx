import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../components/Button";
import Header from "./../../components/Header";
import TaskAdder from "./../../components/Task";
import { getTasksFeature } from "./../../Redux/Features/GetTasksSlice";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksFeature());
  }, []);

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-48  bg-slate-600 h-full"></div>
      <div className="w-full">
        <Header />
        <TaskAdder />
        <Button
          onClick={() => {
            localStorage.clear()
            navigate("/");
          }}
          type="button"
          child="Logout"
          className="text-base bg-green-500 px-8 py-1.5 mt-5 ml-10 rounded-md text-white"
        />
      </div>{" "}
    </div>
  );
}

export default Tasks;
