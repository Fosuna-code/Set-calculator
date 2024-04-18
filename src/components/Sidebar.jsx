import React, { useState } from 'react'
import SetContentForms from './SetContentForms'

export default function Sidebar() {
    const [isSidebarVisible, changeSidebar] = useState(true)
    
    const toggleSidebar = ()=>{
        changeSidebar(!isSidebarVisible)

        if(isSidebarVisible){
            document.getElementById('sidebar').style.visibility = 'visible'
        } 
        if(!isSidebarVisible){
            document.getElementById('sidebar').style.visibility = 'hidden'
        }
    }
    return (
        <div id='sidebar-container'>
            <button onClick={toggleSidebar} id='toggle-sidebar'>Toggle Sidebar</button>
            <div id='sidebar'>
                <SetContentForms/>
            </div>
        </div>
        
    )
}
