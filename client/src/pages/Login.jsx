import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserLogin } from "@/redux/slices/authSlice";


const Login=()=>{

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e)=>{
    e.preventDefault();

    const {email, password} = e.target.elements;
    if(email.value.trim()=="" || password.value.trim()==""){
      toast.error("Please fill all fields");
    }

    try{
      const res = await axios.post(import.meta.env.VITE_API_URL + "/login", {
        email: email.value,
        password: password.value
      });
      const data = await res.data;

      dispatch(setUserLogin(data));

      toast(data.message);

      navigate("/");
    }catch (error) {
      console.error("Login Error:", error);
    
      // Ensure error.response exists before accessing message
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };
    return(
        <div className="w-[64vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
        <h1 className="text-2xl font-bold">Login into your account</h1>

        <form className=" gap-3 grid" onSubmit={handleSubmit}>
            <Input placeholder="Enter your Email" type="email" name="email" />
            <Input placeholder="Enter your Password" type="password" name="password"/>

          <Button >Login</Button>

          <div className="flex gap-2 items-center">
          <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't have an account ? 
            </label>
            <Link to={"/signup"}>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Sign Up
            </label>
            </Link>

          </div>
        </form>
      </div>
    )
}
export default Login;