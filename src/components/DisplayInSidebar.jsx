import React, { useContext } from 'react'
import SetContentForms from './SetContentForms'
import { SetContext } from '../Context';

export default function DisplayInSidebar({display}) {
  const context = useContext(SetContext)

  if(display == 'setforms'){
    return (
      <SetContentForms/>
    )
  }
  if(display == 'setsavail'){
    return (
      <div id='set-btns'>
          {context.setelements.map(el => (
            <button className='setavailbtn' key={`set${el.sets.join('')}`}>{el.sets.join('')}</button>
          ))}
      </div>
    )
    
    
  }
  if(display == 'setcont'){
    return context.setelements.map(el => (
      <div className='setelements-display' key={`${el.sets.join('')}-els-disp`}>
        <h5 className='el-display-h5'>
          Properties of set {`${el.sets}`}:
        </h5>
        <div className='el-display-p-cont'>
          <p className='display-p-label'>Elements:</p>
          <p className='elems-p'>
            {el.elements.join(',')}
          </p> 
        </div>
        <div className='card-display-p-cont'>
          <p>Cardinality</p>
          <p className='elems-p'>
            {`${el.elements.length}`}
          </p>
        </div>
      </div>
    ))
  }
}
