import React from "react";
import { createContext, useState } from "react";
export const SetContext = createContext();


export const SetProvider = ({children }) =>{

    const [setelements, setSetelements] = useState([
        //it should be filled with objects with the following form:
        //{sets: ['name of the set'], elements: [element1, element2 ... elementn]}
    ])
    //store all intersections, with no repeated values, to control further intersection logic
    let allIntersectionsPossible = []
    // this will transform the setelements in an array of objects with the following form:
    //     //{sets: ['name of the set'], size: <int: cardinality of the set>}
    //     //these objects are necessary for the Venn component to diagram them     
    //     //note: by default all sets have a cardinality of 12, it will be changed in the future to change in function of the items stored in that set   
    //     //TODO: manage intersection logic    
    const drawInstructions = () => {
        let instructions = []
        let setelsInstructions = setelements.map(element => {
            return {sets: element.sets, size: element.elements?.length || 12}
        })
        let intersectInstructions = allIntersectionsPossible.map(el =>{
            return {sets: el, size: 3}
        })
        instructions = [...setelsInstructions, ...intersectInstructions]
        return instructions
    }
    
    /*CODE BELOW THIS LINE IS PART OF THE POSSIBLE INTERSECTIONS FUNCTION*/
    let allSetsAvailable = setelements.map(el => el.sets.join(''))
    //starts like this, then it will change to the intersections evaluated at the end of the function
    let currentIntersectionsEvaluated = [...allSetsAvailable]

    const possibleIntersections = (intersectionsToEvaluate, allSets) => {
        //intersections to evalate will be the previous evaluated intersections

        //this is just so it can be splited below if they are arrays, transforming every element into a string
        let intersectSet = [...intersectionsToEvaluate]
    
        //if the first element is an array, is an intersection, transform it to plain text to evaluate it later
        if(typeof intersectionsToEvaluate[0] === 'object'){
            intersectSet = intersectionsToEvaluate.map(el => el.join(','))
        }
        //stores the new intersections with duplicates, before purging
        let newIntersections = []
        //this will loop through every current intersection
        for(let i = 0; i< intersectSet.length; i++){
            //this other loop is to evaluate every intersection with every element available
            for(let j=0; j<allSets.length; j++){
                let currSetToEval = intersectSet[i]
                let currElToEval = allSets[j]
                //this will be used to check if the element has been already evaluated to prevent intersections like 'A,A'
                let elementRegexp = new RegExp(`${currElToEval}`)
                //if it finds a match it is the same set, those intersections are redundadnt and unnecesary
                if(!currSetToEval.match(elementRegexp)){       
                    //sorts the intersection elements before storing them, so they can be properly purged
                    //also adds the new element evaluated (wich is new and unique to the previous stored)
                    let sortedIntersectionPlusEl = [...currSetToEval.split(','), currElToEval].toSorted()
                
                    newIntersections.push([...sortedIntersectionPlusEl])
                }
            }
        }

        let intersectionsTexts = newIntersections.map(el => el.join(','))
    
        //purge duplicates
        let uniqueIntersectionsTexts = [... new Set(intersectionsTexts)]
        //revert to array with unique elements
        let purgedIntersections = uniqueIntersectionsTexts.map(el => el.split(','))

        //puts every intersection evaluated for future use
        currentIntersectionsEvaluated = [...purgedIntersections]

        return purgedIntersections  

    }
    //this for statement runs the function for every set so it can get all intersections possible
    
        for(let r = 0; r < setelements.length; r++){
            let freshIntersections = possibleIntersections(currentIntersectionsEvaluated, allSetsAvailable)
            if(freshIntersections.length > 0){
                allIntersectionsPossible = [...allIntersectionsPossible, ...freshIntersections]
            }
        }
        const intersectionsToAdd = allIntersectionsPossible.map(el => {
            return {sets: [...el], elements:[]}
        })
        const addIntersections = []
        if(intersectionsToAdd.length > 0){
            addIntersections.push(intersectionsToAdd)
        }
        console.log(allIntersectionsPossible)
        console.log(intersectionsToAdd)   
    
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
        const setname = e.target.elements[0].id
        console.log(setname)
        for(let setels of setelements){
            if(setels.sets.join('') === setname){
                setels.elements = elements;
                //destructures the elements array for it to change the object reference and force a re-render of Venn
                const newElements = [...setelements]
                setSetelements(newElements)
            }
        }
    }
    return( 
       <SetContext.Provider value={{ setelements,addSet, modifySet, drawInstructions}}>
            {children}
       </SetContext.Provider>
    )
}