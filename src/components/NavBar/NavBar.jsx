import React, { useState } from 'react'
import { NavLink, Route, Routes} from 'react-router-dom'
import "./NavBar.css"

const NavBar = () => {

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const openSidebar = () =>
  {
    const hamburger = document.getElementById("hamburger");
    setSideBarOpen(true);
    setAnimationClass("slide-in");
  };

  const closeSideBar = () =>
  {
    setAnimationClass("slide-out");
  };

  const handleAnimationEnd = () =>
  {
     if(animationClass === "slide-out") {setSideBarOpen(false);}
  };

  return (

        <div className='nav-container'>

            <div className="nav-header">

                <div 
                className={`hamburger ${sideBarOpen ? "activ" : ""}`} 
                onClick={sideBarOpen ? closeSideBar : openSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <h1 id='title-text'>Paste - A Notes App</h1>
                
            </div>

            <div className="tabs">
                <NavLink 
                to = "/"
                className={
                    ({isActive}) =>
                        isActive ? "nav-link active" : "nav-link"
                }
                >
                    Home
                </NavLink>

                <NavLink 
                to = "/pastes"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    Pastes
                </NavLink>

                <NavLink 
                to = "/about"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    About
                </NavLink>

                <NavLink 
                to = "/contactUs"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    Contact Us
                </NavLink>
            </div>

            {sideBarOpen && (<div className={`sidebar ${animationClass}`} onAnimationEnd={handleAnimationEnd}>
                <NavLink 
                onClick={closeSideBar}
                to = "/"
                className={
                    ({isActive}) =>
                        isActive ? "nav-link active" : "nav-link"
                }
                >
                    Home
                </NavLink>

                <NavLink 
                onClick={closeSideBar}
                to = "/pastes"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    Pastes
                </NavLink>

                <NavLink 
                onClick={closeSideBar}
                to = "/about"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    About
                </NavLink>

                <NavLink 
                onClick={closeSideBar}
                to = "/contactUs"
                className={
                    ({isActive}) => 
                        isActive ? "nav-link active" : "nav-link"
                }>
                    Contact Us
                </NavLink>
            </div>)}
        </div>
  )
}

export default NavBar