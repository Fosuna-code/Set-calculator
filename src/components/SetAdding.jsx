import React from "react";
import { useContext } from "react";
import { SetContext } from "../Context";

function SetAdding({name}){
    const context = useContext(SetContext)
    return(
        <div> 
            <p>{`conjunto ${name}`}</p>
            <input type="text" id="U"></input>
            <button  id="buttonU">Agregar</button>
        </div>
    )
}
export default SetAdding;