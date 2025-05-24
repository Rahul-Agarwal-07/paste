import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    request : JSON.parse(localStorage.getItem("requests")) || []
}

export const requestSlice = createSlice(
    {
        name : "requests",
        initialState,
        reducers :
        {
            addToRequests(state, action)
            {
                console.log("Inside AddtoRequests Reducer");
                const request = action.payload
                state.request.unshift(request);
                localStorage.setItem("requests",JSON.stringify(state.request));

                toast.success("Request Submitted Successfully");
            }
        }
    }
)

export const { addToRequests } = requestSlice.actions
export default requestSlice.reducer