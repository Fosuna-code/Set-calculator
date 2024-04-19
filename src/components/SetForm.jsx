import React, { useContext } from 'react'
import { SetContext } from '../Context'

export default function SetForm({setname}) {
    const context = useContext(SetContext)
    const modifySet = context.modifySet
    return (
        <form onSubmit={modifySet} className='setelements-form'>
            <label htmlFor={`set${setname}elements`} className='setelements-label'>Add elements to set: {`${setname}`}</label>
            <input type="text" placeholder='Separate every element with a comma' id={setname} name='setelements' className='setelements-input'/>
            <button type='submit' className='setelements-btn'>Add</button>
        </form>
    )
}   
