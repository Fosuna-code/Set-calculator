import React, { useContext, useState } from 'react'
import { SetContext } from '../Context'

export default function Keyboard() {
  const [inputVal, setInputVal] = useState('')
  const addInputVal = (val)=>{
    setInputVal(inputVal + val)
  }
  const context = useContext(SetContext)
  return (
    <div id="setkeyboard">
      <div id='keyboard-input'>
        <p type="text" id='keyboard-input'>{inputVal}</p>
        <button id='send-keyboard'></button>
      </div>
      <div id='keyboard-btns'>
        <div id='setpad'>
          <button id="btn1" className='keyboardbtn' onClick={()=>{addInputVal('1')}}>1</button>
          <button id="btn2" className='keyboardbtn' onClick={()=>{addInputVal('2')}}>2</button>
          <button id="btn3" className='keyboardbtn' onClick={()=>{addInputVal('3')}}>3</button>
          <button id="btn4" className='keyboardbtn' onClick={()=>{addInputVal('4')}}>4</button>
          <button id="btn5" className='keyboardbtn' onClick={()=>{addInputVal('5')}}>5</button>
          <button id="btn6" className='keyboardbtn' onClick={()=>{addInputVal('6')}}>6</button>
          <button id="btn7" className='keyboardbtn' onClick={()=>{addInputVal('7')}}>7</button>
          <button id="btn8" className='keyboardbtn' onClick={()=>{addInputVal('8')}}>8</button>
          <button id="btn9" className='keyboardbtn' onClick={()=>{addInputVal('9')}}>9</button>
          <button id="btn<" className='keyboardbtn'>{`<`}</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('0')}}>0</button>
          <button id="btn>" className='keyboardbtn'>{`>`}</button>
        </div>
        <div id='oppad'>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('∪')}}>∪</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('∩')}}>∩</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal("'")}}>'</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('-')}}>-</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('△')}}>△</button>
          <button id="btn0" className='keyboardbtn' onClick={()=>{addInputVal('N()')}}>{`N()`}</button>
        </div>
        
        
      </div>
    </div>
  )
}
