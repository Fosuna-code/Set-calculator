import React, { useState } from 'react'

export default function Keyboard() {
  const [inputVal, setInputVal] = useState('')
  const addInputVal = (val)=>{
    setInputVal(inputVal + val)
  }
  return (
    <div id="setkeyboard">
      <input type="text" id='keyboard-input' value={inputVal}/>
      <div id='keyboard-btns'>
        <button id="btn1" className='keyboardbtn' onClick={()=>{addInputVal('1')}}>1</button>
        <button id="btn2" className='keyboardbtn'>2</button>
        <button id="btn3" className='keyboardbtn'>3</button>
        <button id="btn4" className='keyboardbtn'>4</button>
        <button id="btn5" className='keyboardbtn'>5</button>
        <button id="btn6" className='keyboardbtn'>6</button>
        <button id="btn7" className='keyboardbtn'>7</button>
        <button id="btn8" className='keyboardbtn'>8</button>
        <button id="btn9" className='keyboardbtn'>9</button>
        <button id="btn<" className='keyboardbtn'>{`<`}</button>
        <button id="btn0" className='keyboardbtn'>0</button>
        <button id="btn>" className='keyboardbtn'>{`>`}</button>
      </div>
    </div>
  )
}
