import React, {useContext} from 'react'
import {SetContext} from '../../Context'
import SetForm from '../SetForm/SetForm'

export default function SetContentForms() {
  const context = useContext(SetContext)
  const allsets = context.setelements
  
  return (
    <div id='setContentForms-container'>
      {allsets.map((el,index) => (
        <SetForm 
          setname={el.sets[0]}
          key={el.sets[0]+index}
          />
      ))}
    </div>
  )
}
