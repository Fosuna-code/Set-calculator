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
    
    //this just forces the Venn component to re-render... i didn't find another way to do so
    const [render, reRender] = useState(false)

    const [setelements, setSetelements] = useState([
        //it should be filled with objects with the following form:
        //{sets: ['name of the set'], items: [element1, element2 ... elementn]}
    ])

    const addSet = (e) => {
        e.preventDefault()
        const setname = e.target.elements.setname.value
        const newSets = [...sets, {sets: [`${setname}`], size:12}]
        const newSetelements = [...setelements, {sets: [`${setname}`], elements:[]}]
        setSets(newSets)
        setSetelements(newSetelements)
    }

    const modifySet = (e) => {
        e.preventDefault()
        const elementsTxt = e.target.elements.setelements.value
        const elements = elementsTxt.split(',')
        const setname = e.target.elements[0].className
        for(let set of sets){
            /*I made the class name of the setForm input to be the actual name of the set, so
            this comparison searches for this input, and sees if the current set of the loop
            matches, so this can modify the cardinality of the right element*/
            if(set.sets.join('') === setname){
                set.size = elements.length
                console.log(set.sets.join(''))
                console.log(set.size)
                console.log(sets)
            }
        }
        for(let setels of setelements){
            if(setels.sets.join('') === setname){
                setels.items = elements
                console.log(setels)
            }
        }
        //just changes this so the Venn component re-renders after altering the cardinality value
        reRender(!render)
    }
    return( 
       <SetContext.Provider value={{sets, setSets, addSet, modifySet, render}}>
            {children}
       </SetContext.Provider>
    )
}