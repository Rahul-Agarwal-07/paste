import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Routes, useLocation, Outlet, useNavigate } from 'react-router-dom'
import {AnimatePresence, motion} from "framer-motion"
import NavBar from './components/NavBar/NavBar'
import {ToastContainer} from "react-toastify"
import {useIsMobile} from "./redux/pasteSlice"

const App = () => {

  const location = useLocation();
  const isMobile = useIsMobile();
 
  useEffect(() =>
  {
    window.addEventListener("beforeunload",() =>
    {
      sessionStorage.setItem("allowEdit","false");
    });
  },[]);

  return (
    <div>
      <NavBar />
      <AnimatePresence mode='wait'>
        <div key={location.pathname}>
          <Outlet />
          <ToastContainer 
          key={isMobile ? "mobile" : "desktop"} 
          position={isMobile ? "bottom-center" : "top-center"}
          newestOnTop = {isMobile ? true : false}
          pauseOnFocusLoss = {false}
          pauseOnHover = {false}
          toastClassName={"m-8 max-w-[80%]"}
          theme='dark'
          />
        </div>
      </AnimatePresence>
    </div>
  )
}

export default App