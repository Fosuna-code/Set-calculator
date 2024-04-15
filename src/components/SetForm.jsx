import React, { useContext } from 'react'
import { SetContext } from '../Context'

export default function SetForm({setname}) {
    const context = useContext(SetContext)
    const modifySet = context.modifySet
    return (
        <form onSubmit={modifySet}>
            <label htmlFor={`set${setname}elements`}>Add elements to set: {`${setname}`}</label>
            <input type="text" placeholder='Separate every element with a comma' id={`set${setname}elements`} name='setelements' className={setname}/>
            <button type='submit'>Add elements</button>
        </form>
    )
}   
