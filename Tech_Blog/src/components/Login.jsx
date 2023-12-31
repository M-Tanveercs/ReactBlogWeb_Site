import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto my-10 w-full max-w-lg  bg-transparent  shadow-2xl rounded p-10 border border-slate-300  `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-black w-full mac-w-[100px] text-violet-700 ml-44">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          {" "}
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base texr-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline text-violet-700"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="mt-8 text-center  text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 text-left">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            {/* 
          <input 
          lang="Password"
          placeholder="Enter your password"
          type="password"
          {...register('password',{
            required:true,
            validate:{
              matchPatern:(value)=>/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) || "Password must be at least 8 characters long and contain at least one letter and one number"
            
           } })
          }
          /> */}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full ">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;