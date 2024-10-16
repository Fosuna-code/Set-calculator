import React from "react";
import { useContext } from "react";
import { SetContext } from "../../Context";

function SetAdding(){
    
    const context = useContext(SetContext)
    
    const addSet = context.addSet;
    
    return(
        <div id="setAdding-container" className={`${context.isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
<form onSubmit={addSet} id="addsetForm"> 
        <div id="setlabel-container">
            <label htmlFor="setname" id="addsetLabel">Add a set name:</label>
        </div>
        <div id="setname-container">
            <input type="text" name="setname" id="setname"/>
        </div>
        <div id="setbtn-container">
            <button type="submit" id="addsetBtn">Add set</button>    
        </div>   

        </form>
        </div>
        
    )
}
export default SetAdding;