import React from "react";
import { createContext, useState } from "react";
export const SetContext = createContext();


export const SetProvider = ({children }) =>{

    const [setelements, setSetelements] = useState([
        //it should be filled with objects with the following form:
        //{sets: ['name of the set'], items: [element1, element2 ... elementn]}
    ])

     // this will transform the setelements in an array of objects with the following form:
    //     //{sets: ['name of the set'], size: <int: cardinality of the set>}
    //     //these objects are necessary for the Venn component to diagram them     
    //     //note: by default all sets have a cardinality of 12, it will be changed in the future to change in function of the items stored in that set   
    //     //TODO: manage intersection logic    
    const drawInstructions = () => setelements.map(element => {
        return {sets: element.sets, size: element.items?.length || 12}
    } );
   
       
         
    
    const addSet = (e) => {
        e.preventDefault()
        const setname = e.target.elements.setname.value
        const newSetelements = [...setelements, {sets: [`${setname}`], elements:[]}]

        setSetelements(newSetelements)
    }
    

    const modifySet = (e) => {
        e.preventDefault()
        const elementsTxt = e.target.elements.setelements.value
        const elements = elementsTxt.split(',')
        const setname = e.target.elements[0].className
       
        for(let setels of setelements){
            if(setels.sets.join('') === setname){
                setels.items = elements;
                setSetelements(setelements)
            }
        }
       
    }
    return( 
       <SetContext.Provider value={{ setelements,addSet, modifySet, drawInstructions}}>
            {children}
       </SetContext.Provider>
    )
}