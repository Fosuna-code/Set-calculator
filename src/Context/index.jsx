import React from "react";
import { createContext, useState } from "react";
export const SetContext = createContext();


export const SetProvider = ({children }) =>{

    const [setelements, setSetelements] = useState([
        //it should be filled with objects with the following form:
        //{sets: ['name of the set'], elements: [element1, element2 ... elementn]}
    ])
    const [confirmedIntersections, setIntersections] = useState([
        //it should be filled with objects with the following form:
        //{sets: ['name of the set 1', 'name of the set 2' ... 'name of the set n'], elements: [element1, element2 ... elementn], subset: <bool>}
    ])
    //store all intersections, with no repeated values, to control further intersection logic
    let allIntersectionsPossible = []
    // this will transform the setelements in an array of objects with the following form:
    //     //{sets: ['name of the set'], size: <int: cardinality of the set>}
    //     //these objects are necessary for the Venn component to diagram them     
    //     //note: by default all sets have a cardinality of 12 (if it has no elements in it)
    const drawInstructions = () => {
        let instructions = []
        let setelsInstructions = setelements.map(element => {
            return {sets: element.sets, size: element.elements?.length || 12}
        })
        let intersectInstructions = confirmedIntersections.map(el =>{
            //what this does is that if an intersection is a subset adds size to the father set for it to display more properly
            if(el.subset){
                let setelsInstructionsTexts = setelsInstructions.map(set => set.sets.join(''))
                let relatedSets = setelsInstructions.filter((it, index) => {
                    return it.sets.join('') == setelsInstructionsTexts[index]
            
                })
                
                let fatherSet = relatedSets.reduce((acc, set) => {
                    if(set.size >= acc.size){
                        acc = set
                    }
                    return acc
                })

                let fatherSetIndex = setelsInstructionsTexts.indexOf(fatherSet.sets.join(''))
                setelsInstructions[fatherSetIndex].size += 5
            }
            return {sets: el.sets, size: el.elements.length}
        })

        console.log(confirmedIntersections.map(el => el))
        instructions = [...setelsInstructions, ...intersectInstructions]
        console.log(instructions)
        return instructions
    }
    
    /*CODE BELOW THIS LINE IS PART OF THE POSSIBLE INTERSECTIONS FUNCTION*/
    let allSetsAvailable = setelements.map(el => el.sets.join(''))
    //starts like this, then it will change to the intersections evaluated at the end of the function
    let currentIntersectionsEvaluated = [...allSetsAvailable]

    const possibleIntersections = (intersectionsToEvaluate, allSets)=>{
        let newIntersections = []
        //this is just so it can be splited below if they are arrays, transforming every element into a string
        let intersectSet = [...intersectionsToEvaluate]
    
        //if the first element is an array, is an intersection, transform it to plain text to evaluate it later
        if(typeof intersectionsToEvaluate[0] === 'object'){
            intersectSet = intersectionsToEvaluate.map(el => el.join(','))
        }
        let arrsToEval = [[...intersectSet], [...allSets]]
        //first it flattens the first array then maps it extracting the first and second arrays elements, then compares them
        //if it finds a match that is an 'A','A' intersection wich is redundant
        //then pushes the combination to an array wich be purged
        arrsToEval.reduce((acc, curArr) => {
            return acc.flatMap(el => curArr.map(secel => {
                let elementRegexp = new RegExp(`${secel}`)
                if(!el.match(elementRegexp)){
                    newIntersections.push([...el.split(','), secel].flat().toSorted())
                }
            }))
        })

        let intersectionsTexts = newIntersections.map(el => el.join(','))
        //purge duplicates
        let uniqueIntersectionsTexts = [... new Set(intersectionsTexts)]
        //revert to array with unique elements
        let purgedIntersections = uniqueIntersectionsTexts.map(el => el.split(','))

        //puts every intersection evaluated for future use
        currentIntersectionsEvaluated = [...purgedIntersections]

        return purgedIntersections  
    }

    const getIntersections = (setModified)=>{
        const dependentIntersections = allIntersectionsPossible.filter(el => el.indexOf(setModified) !== -1)
        console.log(dependentIntersections)
        let intersectionElements = []
        let intersectionFormed = ''
        let newIntersectionQueue = []
        let isSubset = true

        dependentIntersections.map(el => {
            //gets the elements that can form an intersection with the set to extract the elements and eval them
            let intersectionToEval = el.toSpliced(el.indexOf(setModified), 1).join(',')
            //if it has a length of 1 it means is a single set not a previous evaluated intersection
            //that means it has to get the data from the sets not the intersections
            if(intersectionToEval.length === 1){
                let setAElements = setelements.filter(el => el.sets.join('') === setModified)[0].elements
                let intersectionBElements = setelements.filter(el => el.sets.join(',') === intersectionToEval)[0].elements
                setAElements.map(el => {
                    if(intersectionBElements.indexOf(el) !== -1){
                        intersectionElements.push(el)
                        intersectionFormed = `${intersectionToEval},${setModified}`
                    }
                })
                //if there are intersections confirmed and whe intersection to eval is in fact an intersection extract the data from that intersection
            } else if(confirmedIntersections.length > 0){
                console.log(confirmedIntersections)
                let setAElements = setelements.filter(el => el.sets.join('') === setModified)[0].elements
                let intersectionB = confirmedIntersections.filter(el => el.sets.join(',') === intersectionToEval)
                //if said intersection does exist and has elements in common with the set its a new intersection
                if(intersectionB[0]?.elements){
                    console.log(intersectionB[0])
                    let intersectionBElements = intersectionB[0].elements
                    setAElements.map(el => {
                        if(intersectionBElements.indexOf(el) !== -1){
                            intersectionElements.push(el)
                            intersectionFormed = `${intersectionToEval},${setModified}`
                        } else{
                            isSubset = false
                        }
                    })
                }    
            } 
            //if the intersection has elements, diagram it
            if(intersectionElements.length > 0){
                let intersectConfirmed = Array.from(new Set(intersectionFormed.split(','))).toSorted()
                //makes a test to see if the intersection has been taken into account in a previous iteration
                if(newIntersectionQueue.length > 0){
                    let queueDupeTest = newIntersectionQueue.filter(elinqueue => elinqueue.sets.join(',') === intersectionFormed)
                    if(queueDupeTest.length === 0){
                        newIntersectionQueue.push({sets: [...intersectConfirmed], elements: [...intersectionElements], subset: isSubset})
                    }
                } else {
                    newIntersectionQueue.push({sets: [...intersectConfirmed], elements: [...intersectionElements], subset: isSubset})
                }
                
                console.log(intersectConfirmed)
                
            }
            //refresh the elements for next iteration
            intersectionElements = []
            isSubset = false
        })
        if(newIntersectionQueue.length > 0){
            setIntersections([...confirmedIntersections, ...newIntersectionQueue])
        }
    }
    
    //this for statement runs the function for every set so it can get all intersections possible
    for(let r = 0; r < setelements.length-1; r++){
        let freshIntersections = possibleIntersections(currentIntersectionsEvaluated, allSetsAvailable)
        if(freshIntersections.length > 0){
            allIntersectionsPossible = [...allIntersectionsPossible, ...freshIntersections]
        }
    }

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
                setels.elements = Array.from(new Set(elements));
                //destructures the elements array for it to change the object reference and force a re-render of Venn
                const newElements = [...setelements]
                setSetelements(newElements)
            }
        }
        getIntersections(setname)
        console.log(confirmedIntersections)
    }
    return( 
       <SetContext.Provider value={{ setelements,addSet, modifySet, drawInstructions}}>
            {children}
       </SetContext.Provider>
    )
}