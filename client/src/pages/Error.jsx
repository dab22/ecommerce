import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen text-center">
            <h1 className="text-3xl sm:text-5xl font-bold">404 Page Not Found!</h1>
            <Link to={"/"} className="underline text-sm sm:text-lg mt-4">Click here to go to Home Page</Link>
        </div>
    );
};

export default Error;
