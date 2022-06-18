import React, { useState } from "react";
import { Button } from "../../components/Button";
import { InputField } from "./../../components/InputField/index";
import { useDispatch } from "react-redux";
import { loginFeature, LoginProps } from "./../../Redux/Features/LoginSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {loading} = useSelector((state: RootState) => state.login)

  const [userData, setUserData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleChange = (e: InputEvent) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      [e.target.name]: value,
    });
  }

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      return;
    }
    const data: LoginProps = { email, password, navigate };
    dispatch(loginFeature(data));
  };

  return (
    <div className="flex justify-center items-center w-full mt-36">
      <form
        onSubmit={loginHandler}
        className="px-2 w-96 h-96 border border-t-0 bg-cyan-50 border-stone-300 rounded-sm"
      >
        <h3 className="pl-2 pt-4">Login to Continue</h3>

        <div className="w-full pt-5">
          <InputField
            name="email"
            type="text"
            className="w-full py-2 px-3 outline-none "
            label="Email"
            onChange={handleChange}
            child={userData?.email}
            placeholder="Email"
          />

          <InputField
            name="password"
            type="password"
            className="w-full py-2 px-3 outline-none "
            label="Password"
            onChange={handleChange}
            child={userData?.password}
            placeholder="Password"
          />

          <div className="flex pt-7 pr-3 justify-center">
            <Button
              type="submit"
              child={loading ? <Loader/> : "Login"}
              className="text-base bg-green-500 px-8 py-1.5 rounded-md text-white"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
