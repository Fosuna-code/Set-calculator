import React, { useContext } from 'react'
import { SetContext } from '../../Context'

export default function SetForm({setname, color}) {
    const context = useContext(SetContext)
    const modifySet = context.modifySet
    console.log(color)
    return (
        <form onSubmit={modifySet} className='setelements-form'>
            <label htmlFor={`${setname}`} className='setelements-label' style={{'backgroundColor': color}}>{`${setname}`}</label>
            <input type="text" placeholder='Separate each element with commas' id={setname} name='setelements' className='setelements-input'/>
            <div className='form-btn-container'>
                <button type='submit' className='setelements-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16" className='setform-svg'>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
            </div>
        </form>
    )
}   
