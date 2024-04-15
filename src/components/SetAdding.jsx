import React from "react";
import { useContext } from "react";
import { SetContext } from "../Context";

function SetAdding(){
    
    const context = useContext(SetContext)
    
    const addSet = context.addSet;
    
    return(
        <form onSubmit={addSet} id="addsetForm"> 
            <label htmlFor="setname" id="addsetLabel">Add a set name</label>
            <input type="text" name="setname" id="setname"/>
            <button type="submit" id="addsetBtn">Add set</button>
        </form>
    )
}
export default SetAdding;