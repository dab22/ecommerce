import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/redux/slices/authSlice";
import axios from "axios";
const AdminLogin=()=>{

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if(!username || !password){
      return toast.error("Please fill all the fields");
    }

    try{
      const res = await axios.post(import.meta.env.VITE_API_URL + "/admin-login", {username, password});
      const data = await res.data;

      dispatch(setUserLogin(data));
      toast.success("login successfull");
      navigate("/admin/dashboard");
    } catch(error){
      toast.error(error.message);
    }
  }
    return(
        <div className="w-[64vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
        <h1 className="text-2xl font-bold">Login into your account</h1>

        <form className=" gap-3 grid" onSubmit={handleLogin}>
            <Input placeholder="Enter your username..." type="text" name="username" />
            <Input placeholder="Enter your Password..." type="password" name="password"/>

          <Button >Login</Button>

          
        </form>
      </div>
    )
}
export default AdminLogin;