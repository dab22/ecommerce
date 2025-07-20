import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";

const Signup = () => {

    const [enabled, setEnabled] = useState(false);

    const navigate = useNavigate();
    //const {toast} = Toaster;
    
    const handleSubmit = async (e) => { 
      e.preventDefault();

      const { name, email, phone, password } = e.target.elements;

      if (
          name.value.trim() === "" ||
          email.value.trim() === "" ||
          phone.value.trim() === "" ||
          password.value.trim() === ""
      ) {
          toast.error("Please fill all the fields",{
            style: { background: "red", color: "white" },
          });

          
          return;
      }

      try {
          const res = await axios.post(import.meta.env.VITE_API_URL + "/signup", {
            name: name.value, 
            email: email.value,
            phone: phone.value,
            password: password.value
          });
          const data = await res.data;
          toast.success("Signup successful!");
          //toast(data.message);
          navigate("/login");

      } catch (error) {
          toast.error(error.response.data.message || "Something went wrong"); 
      }
  };
  return (
    <>
      <div className="w-[64vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
        <h1 className="text-2xl font-bold">Register your account</h1>

        <form className=" gap-3 grid" onSubmit={handleSubmit}>
          <Input placeholder="Enter your Name" type="text" name="name" />
          <Input placeholder="Enter your Email" type="email" name="email" />
          <Input placeholder="Enter your Phone" type="tel" name="phone" />
          <Input placeholder="Enter your Password" type="password" name="password"/>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" onCheckedChange={(e)=>setEnabled(e)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>

          <Button disabled={!enabled}>Sign up</Button>

          <div className="flex gap-2 items-center">
          <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Already Have an account ? 
            </label>
            <Link to={"/login"}>
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Login
            </label>
            </Link>

          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
