import React from 'react'
import "./AboutPage.css"
import PageWrapper from "../../PageWrapper"

const AboutPage = () => {
  return (
    <PageWrapper>
    <div className='about-page-container'>
      <p className="about-page-content">
        <b>About This App</b> <br /> <br />

Welcome to <strong style={{color : "var(--normal)"}}>Paste</strong> — a simple and efficient notes app designed to help you organize your thoughts, tasks, and ideas effortlessly. Whether you're jotting down a quick reminder or planning something big, this app provides a clean and intuitive interface to create, edit, and manage your notes.
<br /><br />
Features:
<br /><br />
• Create, edit, and delete notes with ease
<br />
• Autosave and persistent storage
<br />
• Simple and distraction-free user experience
<br />
• Organized layout for quick access to your notes
<br /><br />

Whether you're a student, professional, or just someone who loves staying organized — this app is built for you.
      </p>
    </div>
    </PageWrapper>
  )
}

export default AboutPage