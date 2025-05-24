import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import "./HomePage.css"
import PageWrapper from '../../PageWrapper';
import { addToPaste, updateToPaste } from '../../redux/pasteSlice';

const HomePage = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [searchParams, setParams] = useSearchParams();
  const [hasChecked, setHasChecked] = useState(false);
  const dispatch = useDispatch();
  const pasteId = searchParams.get("id");
  const newPaste = useSelector((state) => state.pastes.paste.find(u => u.id === pasteId))
  const navigate = useNavigate();
  
  useEffect(() =>
  {
    const allowEdit = sessionStorage.getItem("allowEdit") === "true";

    if(allowEdit && pasteId)
    {
      setEditMode(true);
      setTitle(newPaste.title);
      setValue(newPaste.content);
    }

    else setEditMode(false);
    setHasChecked(true);

  },[pasteId]);

  function createPaste(event)
  {
    event.stopPropagation();
    console.log("Inside createPaste function");
    console.log(pasteId);
    
    const paste = 
    {
      title : title,
      content : value,
      id : Date.now().toString(36),
      createdAt : new Date().toLocaleDateString("en-US",{
        year : 'numeric',
        month : 'short',
        day : '2-digit'
      })
    }

    dispatch(addToPaste(paste));
    clearUpPage();
  }

  function updatePaste(event)
  {
    console.log("Inside Update Paste")
    event.stopPropagation();

    const paste = {...newPaste, title : title, content : value, createdAt : new Date().toLocaleDateString("en-US",{
        year : 'numeric',
        month : 'short',
        day : '2-digit'
      })}

    dispatch(updateToPaste(paste));
    clearUpPage();
    setEditMode(false);
  }
  
  function clearUpPage()
  {
    setTitle("");
    setValue("");
    setParams({});
  }

  if(!hasChecked) return null;

  return (

    <PageWrapper>
    <div className='home-page-container'>
      
      <div className="main-container">

      <div className="title-container">

          <input 
          className= 'title-box' 
          type="text" 
          placeholder='Enter Title' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          />

          <button onClick = {(e) => (isEditMode) ? updatePaste(e) : createPaste(e) } className="submit-btn-desktop">
          { (isEditMode) ? "Update Paste" : "Create New Paste" }
          </button>

      </div>

      <div className="content-container">

        <textarea 
          value = {value}
          id="content-text-box"
          placeholder='Enter Content Here'
          onChange={ (e) =>  setValue(e.target.value) }
        ></textarea>

        <button onClick = {(e) => (isEditMode) ? updatePaste(e) : createPaste(e)} className="submit-btn-mobile">
          { (isEditMode) ? "Update Paste" : "Create New Paste" }
          </button>

      </div>

      </div>

    </div>
    </PageWrapper>
  )
}

export default HomePage