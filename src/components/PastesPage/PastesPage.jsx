import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import {FaSave, FaEdit, FaEye, FaTrash, FaCopy} from "react-icons/fa"
import {deletePaste, resetAllPastes} from "../../redux/pasteSlice"
import "./PastesPage.css"
import PageWrapper from '../../PageWrapper'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'

const PastesPage = () => {

  const [searchInput, setSearchInput] = useState("");

  const pastes = useSelector((state) => state.pastes.paste);
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchInput.toLowerCase()));
  const dispatch = useDispatch();

  function removePaste(pasteId, event)
  {
    event.stopPropagation();
    console.log("paste");
    dispatch(deletePaste(pasteId));
  }

  function handleCopy(content,event)
  {
    event.stopPropagation();
    navigator.clipboard.writeText(content);
    toast.success("Copied to Clipboard!");
  }

  function handleView(pasteId,event)
  {
    event.stopPropagation();
    navigate(`/pastes/${pasteId}`)
  }

  function handleEdit(pasteId,event)
  {
    event.stopPropagation();
    sessionStorage.setItem("allowEdit","true");
    const params = new URLSearchParams({id : pasteId});
    navigate(`/?${params}`);
    
  }

  function handleDeleteAll(event)
  {
    event.stopPropagation();
    dispatch(resetAllPastes());
  }
  
  return (
    <PageWrapper>

    <div className='pastes-container'>

       <div className="top-container">

         <input 
          type="text"
          className='search-input-box' 
          placeholder='Search Here'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} />

          <button className='delete-button' onClick={(e) => handleDeleteAll(e)}>Delete All</button>

       </div>
       
       <div className="pastes-list-container">
        { 
          (filteredData.length === 0 ) ? (<div className='flex items-center justify-center h-[60vh] text-white text-4xl font-semibold p-6'>No Pastes Found</div>) : (filteredData.map(
            (paste) => (
            
                <div className="paste-card" key={paste.id} onClick={(e) => handleView(paste.id,e)}>
                  
                  <div className="paste-card-top-container">

                    <div className="paste-title">
                      {paste.title}
                    </div>

                    <div className="paste-card-button-container">

                       <button className="paste-card-button" onClick={(e) => handleEdit(paste.id,e)}>
                          <FaEdit />
                       </button>

                       <button className="paste-card-button" onClick={(e) => handleView(paste.id,e)}>
                          <FaEye />
                       </button>

                       <button className="paste-card-button" onClick={(e) => removePaste(paste.id,e)}>
                          <FaTrash />
                       </button>

                       <button className="paste-card-button" onClick={(e) => handleCopy(paste.content,e)}>
                          <FaCopy />
                       </button>

                    </div>

                  </div>

                  <div className="paste-card-bottom-container">
                     <div className="paste-content">
                        {paste.content}
                     </div>

                     <div className="paste-card-additional-info">
                       {paste.createdAt}
                     </div>
                  </div>

                </div>
              ))
            )}
       </div>

    </div>
    </PageWrapper>
  )
}

export default PastesPage