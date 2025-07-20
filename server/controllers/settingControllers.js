const ROLES = require ("../utils/constants");
const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const changeUsername = async(req,res)=>{
    if(req.role !== ROLES.admin){
        return res.status(401).json({success: false, message: "Access Denied"});
    }

    try{
        const {previousUsername, newUsername} = req.body;
        if(!newUsername){
            return res.status(400).json({success: false, message: "Username to change is required"});
        }

        const user = await Admin.findOneAndUpdate(
            {username: previousUsername}, 
            {username: newUsername},
            {new: true}
        );

        if(!user){
            return res.Status(404).json({
                success: false, 
                message: "User doesnot exists",
                user:{username: user.username, roll: user.role}
            });
        }

        return res.status(200).json({success: true, message: `New Username is ${user.username}`});

    }catch(error){
        return res.status(500).json({success: false, message:error.message});
    }
};



const changePassword = async(req, res)=>{
    if(req.role !== ROLES.admin){
        return res.status(401).json({success: false, message: "Access denied"});
    }

    try{
        const {userName, previousPassword, newPassword} = req.body;
        if(!previousPassword || !newPassword){
            return res.status(400).json({success: false, message: "Previous and new password required"});
        }

        let user = await Admin.findOne({userName});
        if(!user){
            return res.status(404).json({Success: false, message: "User not found"});
        }

        const isPasswordValid = await bcrypt.compare(previousPassword, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Previous password is incorrect"});
        }

        const securePassword = await bcrypt.hash(newPassword, 10);
        user.password = securePassword;
        await user.save();
        return res.status(200).json({success: true, message: "password changed successfully"});
    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};

module.exports = {changeUsername, changePassword};



