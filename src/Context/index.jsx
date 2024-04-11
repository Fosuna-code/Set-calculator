import React from "react";
import { createContext, useState } from "react";

export const SetContext = createContext();

export const SetProvider = ({children }) =>{
    // store the Sets created by users 
    const [sets,setSets] = useState([ 

        {sets: ['A'], size: 12}, 
        {sets: ['B'], size: 12},
        {sets: ['A','B'], size: 2}
    ]);
    
    return( 
       <SetContext.Provider value={{sets,setSets}}>
        {children}
       </SetContext.Provider>
    )
}