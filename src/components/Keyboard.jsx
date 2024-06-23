import React, { useContext, useState, useRef, useEffect } from 'react'
import { SetContext } from '../Context'

export default function Keyboard() {

  const context = useContext(SetContext)
  //used to display the input value when an input is added from a button and move the cursor to a correct position
  const [inputVal, setInputVal] = useState({
    val: '',
    pos: 0
  })
  //used to see what to display or not in order to diminish the amount of invalid inputs possible
  const [keyboardState, setKeybState] = useState({
    setpad: 'show',
    oppad:'hide',
    complement: 'hide',
    ispartOf: 'hide'
  })
  const inputref = useRef(null)
  //used to move the cursor around the input:
  const moveCursor = (position)=>{
    if(inputref.current){
      inputref.current.setSelectionRange(position, position)
    }
  }
  //this functions validates on-time the inputs, right now it just tests what the input contains
  const handleChange = (e)=>{
    let inputValue = e.target.value
    let updatedCursorPosition = e.target.selectionEnd
    //these are regular expressions used to validate some forms of input
    const setRegexp = /[^\(\)"]+/g
    const elementRegexp = /"\D+"/g
    //sees if a character has been deleted to update the keyboard and show the inputs that are supposed to be shown before that character was deleted
    if(inputValue.length < inputVal?.val.length){
      let extraValue = inputValue.split('').pop()
      if(extraValue === "'"){
        setKeybState({
          setpad: 'hide',
          oppad:'show',
          complement: 'show',
          ispartOf: 'hide'
        })
      } else if(keyboardState.setpad === 'show'){
        setKeybState({
          setpad: 'hide',
          oppad:'show',
          complement: 'show',
          ispartOf: 'hide'
        })
      } else{
        setKeybState({
          setpad: 'show',
          oppad:'hide',
          complement: 'hide',
          ispartOf: 'hide'
        })
      }
    }
    //if the most recent input was a parenthesis and nothing has been deleted close it automatically
    if((/[\(]?/g).test(inputValue) && inputValue.length >= inputVal?.val.length){
      let mostRecentValue = inputValue.split('')[updatedCursorPosition - 1]
      if(mostRecentValue === "(") {
        inputValue += ')'
      }
    }
    //if the first input is a letter, it blocks the setpad because it is a '"' or it is a setName, either way there shouldn't be a set as an input afther both ocurrences
    if(setRegexp.test(inputValue)){
      setKeybState({
        setpad: 'hide',
        oppad:'show',
        complement: 'show',
        ispartOf: 'hide'
      })
      //if the input is a '"' it should block every input until it's closed
    }else if((/"/g).test(inputValue)){
      setKeybState({
        setpad: 'hide',
        oppad:'hide',
        complement: 'hide',
        ispartOf: 'hide'
      })
    }
    //if it detects an element surrounded by double quotes it refers to a simple element rather than a set, so it only shows the "is part of" operator because is the only valid operator to evaluate a single element rather than a set
    if(elementRegexp.test(inputValue)){
      setKeybState({
        setpad: 'hide',
        oppad:'hide',
        complement: 'hide',
        ispartOf: 'show'
      })
    }
    //updates the state
    setInputVal(()=>{
      return {
        val: inputValue,
        pos: updatedCursorPosition
      }
    })
  }
  //this adds a value to the state depending on the button of the calculator for it to be displayed
  const addInputVal = async (val, shown)=>{
    //this evaluates if the button is not hidden at the moment
    if(shown == 'show'){
      let inputValues = inputVal.val.split('')
      //updates the input value and the cursor position
      if(inputref.current) {
        inputref.current.focus()
        let updatedCursorPosition = inputref.current.selectionStart
        
        inputValues.length > 0 ? inputValues[updatedCursorPosition -1] += val : inputValues[0] = val
        if(val === "N()"){
          await setInputVal(()=>{
            return {val: inputValues.join(''),
            pos: updatedCursorPosition + 2
            }
          })
        }else {
          await setInputVal(()=>{
            return {val: inputValues.join(''),
            pos: updatedCursorPosition + 1
            }
          })
        }
      }
      //if the input is a parenthesis, or the cardinality operator preserve the previous state
      if(val === "()" || val === "N()"){
        setKeybState(()=>keyboardState)
        //but in this case move the cursor to the right
      } 
      else {  
        //if its a complement operation there has to be a normal operation next but not another complement one
        if(val === "'"){
          setKeybState({
            setpad: 'hide',
            oppad:'show',
            complement: 'hide',
            ispartOf: 'hide'
          })
          //if the setpad is shown, hide it (it only happens when a setpad button is pressed)
        }else if(keyboardState.setpad=='show'){
          setKeybState({
            setpad: 'hide',
            oppad:'show',
            complement: 'show',
            ispartOf: 'hide'
          })
        }
        //if there is no ocurrence, revert to original state
        else{
          setKeybState({
            setpad: 'show',
            oppad:'hide',
            complement: 'hide',
            ispartOf: 'hide'
          })
        }
      }
    }
    
  }

  const makeOperation = (e)=>{
    e.preventDefault()
    const inputValue = e.target.elements['keyboard-input'].value
    const intersectionRegexp = /\D*(?:\D'?∩\D'?[^∪-△]?)+/g
    const unionRegexp = /\D*(?:\D'?∪\D'?[^∩-△]?)+/g
    const complementRegexp = /\D'/g
    const differenceRegexp = /\D*(?:\D'?-\D'?[^∪∩△]?)+/g
    const simmetricDifferenceRegexp = /\D*(?:\D'?△\D'?[^∪∩-]?)+/g
    //it currently does nothing, is only used to prevent a form submission
    //and it also has regular expressions that will be used in the future to validate the input and do de algebra
  }
  //changes the cursor position to where it should be after an input is added
  useEffect(()=>{
    setTimeout(()=>{
      moveCursor(inputVal.pos)
    })
  },[inputVal.val])

  return (
    <div id="setkeyboard">
      <form id='keyboard-form' onSubmit={makeOperation}>
        <input ref={inputref} type="text" id='keyboard-input' value={inputVal.val} onChange={handleChange}></input>
        <button id='send-keyboard' type='submit'>Make Operation</button>
      </form>
      <div id='keyboard-btns'>
        <div id='setpad' className={keyboardState.setpad}>
          {context.setelements.map(el => (
            <button className='setoppbtn' key={`set${el.sets.join('')}`} onClick={()=>{
              addInputVal(el.sets.join(''), keyboardState.setpad)}}>{el.sets.join('')
              }
            </button>
          ))}
        </div>
        <div id='oppad'>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal('∪', keyboardState.oppad)}}>∪</button>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal('∩', keyboardState.oppad)}}>∩</button>
          <button className={`keyboardbtn ${keyboardState.complement}`} onClick={()=>{addInputVal("'", keyboardState.complement)}}>'</button>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal('-', keyboardState.complement)}}>-</button>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal('△', keyboardState.oppad)}}>△</button>
          <button className={`keyboardbtn`} onClick={()=>{addInputVal('N()', 'show')}}>{`N()`}</button>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal("⊂", keyboardState.oppad)}}>⊂</button>
          <button className={`keyboardbtn ${keyboardState.ispartOf}`} onClick={()=>{addInputVal("∈", keyboardState.ispartOf)}}>∈</button>
          <button className={`keyboardbtn`} onClick={()=>{addInputVal("()", 'show')}}>()</button>
        </div>
        
        
      </div>
    </div>
  )
}
