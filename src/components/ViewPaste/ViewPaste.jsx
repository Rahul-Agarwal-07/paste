import React from 'react'
import "./ViewPaste.css"
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import PageWrapper from '../../PageWrapper'

const ViewPaste = () => {
  
  const { id } = useParams();
  
  const paste = useSelector((state) => state.pastes.paste.find(u => u.id === id))
  console.log(paste);

  return (
    <PageWrapper>
    <div className='view-paste-container'>
       <div className="paste-container">
          <div className="title-container">
            {paste.title}
          </div>

          <div className="content-container">
            {paste.content}
          </div>
       </div>
    </div>
    </PageWrapper>
  )
}

export default ViewPaste