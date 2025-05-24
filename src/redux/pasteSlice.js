import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 768)
{
  const[isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() =>
  {
    function handleResize()
    {
      setIsMobile(window.innerWidth < breakpoint);
    }

    window.addEventListener('resize',handleResize);
    
    return () =>
    window.removeEventListener('resize',handleResize);
    
  },[breakpoint]);

  return isMobile;
}


const initialState = {
  paste: JSON.parse(localStorage.getItem("paste")) || []
}

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState,
  reducers: {
    addToPaste : (state, action) =>
    {
      console.log("Inside addToPaste Reducer");

      const paste = action.payload;
      const isValid = paste.title.trim() != "" && paste.content.trim() != "";

      if(!isValid) 
      {
        toast.warn("Title or Content is Empty!");
        return;
      }

      state.paste.unshift(paste);
      localStorage.setItem("paste",JSON.stringify(state.paste));

      toast.success("Paste Created Successfully!");
    },

    updateToPaste : (state, action) =>
    {
      const paste = action.payload;
      const index = state.paste.findIndex((item) => item.id === paste.id);

      const isValid = paste.title.trim() != "" && paste.content.trim() != "";

      if(!isValid) 
      {
        toast.warn("Title or Content is Empty!");
        return;
      }

      if(index >= 0)
      {
        console.log("Inside Update Reducer");
        state.paste.splice(index,1);
        console.log(index);
        state.paste.unshift(paste);
        sessionStorage.setItem("allowEdit","false");
        localStorage.setItem("paste", JSON.stringify(state.paste));
        toast.success("Paste Updated Successfully!");
      }
    },

    deletePaste : (state,action) =>
    {
      const pasteId = action.payload;

      const index = state.paste.findIndex((item) => item.id === pasteId);

      if(index >= 0)
      {
        state.paste.splice(index,1);
        localStorage.setItem("paste", JSON.stringify(state.paste));
        toast.success("Paste deleted Successfully!");
      }
    },

    resetAllPastes : (state, action) =>
    {
      if(state.paste.length === 0) 
      {
        toast.success("No Pastes to delete");
        return;
      }
      
      state.paste = [];
      localStorage.removeItem("paste");
      toast.success("All Pastes are deleted");
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, deletePaste, resetAllPastes, updateToPaste } = pasteSlice.actions

export default pasteSlice.reducer