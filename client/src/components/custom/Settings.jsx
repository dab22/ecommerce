import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useErrorLogout from "@/hooks/use-error-logout";
import { toast } from "sonner";
import axios from "axios";


const Settings=()=>{

    const {handleErrorLogout} = useErrorLogout();

    const changeUserName = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const previousUsername = formData.get("previousUsername");
        const newUsername = formData.get("newUsername");

        if(!newUsername || !previousUsername){
            toast.error("invalid data");
            return;
        }

        try{
            const res = await axios.put(import.meta.env.VITE_API_URL + "/change-username",
                {previousUsername, newUsername},
                { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            
            const data = await res.data;
            localStorage.setItem("user", JSON.stringify(data.user));
            e.target.reset();

            return toast.success("Username changed successfully");
        }catch(error){
            toast.error("Something went wrong");
            return handleErrorLogout(error);
        }
    };

    const changePassword = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const previousPassword = formData.get("previousPassword");
        const newPassword = formData.get("newPassword");

        if(!newPassword || !previousPassword){
            toast.error("Password to change is required");
            return;
        }

        try{
            const res = await axios.put(import.meta.env.VITE_API_URL + "/change-password",
                {previousPassword, newPassword, username: JSON.parse(localStorage.getItem("user")).username},
                { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            
            const data = await res.data;
            localStorage.setItem("user", JSON.stringify(data.user));
            e.target.reset();

            return toast.success("Password changed successfully");
        }catch(error){
            toast.error("Something went wrong");
            return handleErrorLogout(error);
        }
    };

    return(
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-screen sm:w-[80vw] sm:justify-start">
            <div >
                <h2 className="text-2xl font-bold mb-3">Change Username</h2>
                <form className="grid  gap-3 w-[80vw] sm:w-[30vw]" onSubmit={changeUserName}>
                    <Input type="text" placeholder="Enter your previous Username" name="previousUsername"/>
                    <Input type="text" placeholder="Enter your new Username" name="newUsername"/>
                    <Button type="submit" className="w-fit">Change Username</Button>
                </form>
            </div>

            <div >
                <h2 className="text-2xl font-bold mb-3">Change Password</h2>
                <form className="grid  gap-3 w-[80vw] sm:w-[30vw]" onSubmit={changePassword}>
                    <Input type="text" placeholder="Enter your previous Password" name="previousPassword"/>
                    <Input type="text" placeholder="Enter your new Password" name="newPassword"/>
                    <Button type="submit" className="w-fit">Change Password</Button>
                </form>
            </div>
        </div>
    )
}

export default Settings;

