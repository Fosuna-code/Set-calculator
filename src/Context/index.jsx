import React from "react";
import { createContext, useState } from "react";

export const SetContext = createContext();


export const SetProvider = ({children }) =>{
    // store the Sets created by users
    const [sets,setSets] = useState([ 
        //soon, this will be filled with objects with the following form:
        //{sets: ['name of the set'], size: <int: cardinality of the set>}
        //these objects are necessary for the Venn component to diagram them 
        
        //note: by default all sets have a cardinality of 12, it will be changed in the future to change in function of the items stored in that set   

        //TODO: manage intersection logic    
    ]);

    const addSet = (e) => {
        e.preventDefault()
        const setname = e.target.elements.setname.value
        const newSets = [...sets, {sets: [`${setname}`], size:12}]
        setSets(newSets)
        console.log(sets, newSets)
    }

    return( 
       <SetContext.Provider value={{sets, setSets, addSet}}>
            {children}
       </SetContext.Provider>
    )
}