import React, { useState } from "react";
import {toast} from "react-toastify"
import "./ContactUsPage.css";
import { addToRequests } from "../../redux/contact_requests";
import { useDispatch } from "react-redux";
import PageWrapper from "../../PageWrapper"

const ContactUsPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function handleSubmit()
  {
    if(name.trim() === "" || email.trim() === "" || message.trim() === "")
    {
      toast.warn("Name or email or message is empty!");
      clearUpPage();
      return;
    }

    const request = 
    {
      id : Date.now().toString(36),
      name : name,
      email : email.toLowerCase(),
      message : message
    }

    dispatch(addToRequests(request));
    clearUpPage();
    
  }

  function clearUpPage()
  {
    setEmail("");
    setName("");
    setMessage("");
  }

  return (
    <PageWrapper>

    <div className="contact-us-container">

      <div className="contact-us-inner-container">
        
        <p className="contact-us-title">Contact Us</p>

        <div className="contact-us-form">
          <input
            type="text"
            placeholder="Enter Fullname"
            className="input-box"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <input 
            type="text" 
            placeholder="Enter Email" 
            className="input-box" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <textarea
            type="text"
            placeholder="Enter Message"
            className="input-box"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    </PageWrapper>
  );
};

export default ContactUsPage;
