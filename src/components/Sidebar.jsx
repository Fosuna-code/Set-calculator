import React, { useState } from 'react'
import SetContentForms from './SetContentForms'
import DisplayInSidebar from './DisplayInSidebar'

export default function Sidebar() {
    const [isSidebarVisible, changeSidebar] = useState(true)

    const [sidebarShown, setSidebarShown] = useState('setforms')

    const toggleSidebar = ()=>{
        changeSidebar(!isSidebarVisible)
    }
    const showInSidebar = (menu)=>{
        setSidebarShown(menu)
    }
    return (
        <>
            <button onClick={toggleSidebar} id='toggle-sidebar'>Toggle Sidebar</button>
            <div id='sidebar-menu'>
                <button onClick={()=>{showInSidebar('setforms')}}>Content Forms</button>
                <button onClick={()=>{showInSidebar('setsavail')}}>Available Sets</button>
                <button onClick={()=>{showInSidebar('setcont')}}>Sets contents</button>
            </div>
            <div id='sidebar' className={isSidebarVisible ? 'sidebar-active':'sidebar-inactive'}>
                <DisplayInSidebar display={sidebarShown}>

                </DisplayInSidebar>
            </div>
        </>
        
    )
}
