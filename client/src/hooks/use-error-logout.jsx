import { useDispatch } from "react-redux";
import { setUserLogout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

const useErrorLogout=()=>{
    const dispatch = useDispatch();
    const handleErrorLogout = (error, otherTile = "Error Ouccred")=>{
        if(error.response?.status === 401){
            dispatch(setUserLogout());
            toast.error("session expired");
        }
        else{
            toast.error("other tile");
        }
    }
    return {handleErrorLogout};
}

export default useErrorLogout;













// import { useDispatch } from "react-redux";
// import { setUserLogout } from "@/redux/slices/authSlice";
// import { toast } from "sonner";

// const useErrorLogout = () => {
//     const dispatch = useDispatch();

//     const handleErrorLogout = (error, otherTitle = "An error occurred") => {
//         console.error("Error Details:", error); // Debugging log

//         if (!error?.response) {
//             toast.error("Network error. Please check your connection.");
//             return;
//         }

//         if (error.response.status === 401) {
//             dispatch(setUserLogout());
//             toast.error("Session expired. Please log in again.");
//         } else {
//             // Show the API error message if available
//             const errorMessage = error.response.data?.message || otherTitle;
//             toast.error(errorMessage);
//         }
//     };

//     return { handleErrorLogout };
// };

// export default useErrorLogout;
