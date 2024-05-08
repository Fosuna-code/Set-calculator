import React, { useContext, useState } from 'react'
import { SetContext } from '../Context'

export default function Keyboard() {
  //used to display the input value when an input is added from a button
  const [inputVal, setInputVal] = useState('')
  //used to see what to display or not in order to diminish the amount of invalid inputs possible
  const [keyboardState, setKeybState] = useState({
    setpad: 'show',
    oppad:'hide',
    complement: 'hide',
    ispartOf: 'hide'
  })
  //stores what operations are special in terms that they cannot be combined with other sets or themselves
  const specialOperations = ["'", '∈']
  //this functions validates on-time the inputs, right now it just tests what the input contains
  const handleChange = (e)=>{
    let inputValue = e.target.value
    //updates the state
    setInputVal(()=>inputValue)
    //these are regular expressions used to validate many forms of input
    const setRegexp = /\D+/g
    const intersectionRegexp = /\D*(?:\D'?∩\D'?[^∪-△]?)+/g
    const unionRegexp = /\D*(?:\D'?∪\D'?[^∩-△]?)+/g
    const complementRegexp = /\D'/g
    const differenceRegexp = /\D*(?:\D'?-\D'?[^∪∩△]?)+/g
    const simmetricDifferenceRegexp = /\D*(?:\D'?△\D'?[^∪∩-]?)+/g
    const elementRegexp = /"\D+"/g
    //if the first input is a letter, it blocks the setpad because it is a '"' or it is a setName, either way there shouldn't be a set as an input afther both ocurrences
    if(setRegexp.test(inputValue)){
      setKeybState({
        setpad: 'hide',
        oppad:'show',
        complement: 'show',
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
    
    // console.log('im doing things xd, btw this is your input: ', inputValue)
    // console.log('aand this is the intersection Regexp test:', inputValue.match(intersectionRegexp))
    // console.log('aand this is the union Regexp test:', inputValue.match(unionRegexp))
    // console.log('aand this is the complement Regexp test:', inputValue.match(complementRegexp))
    // console.log('aand this is the difference Regexp test:', inputValue.match(differenceRegexp))
    // console.log('aand this is the simmetric difference Regexp test:', inputValue.match(simmetricDifferenceRegexp))
    // console.log('aand this is the element Regexp test:', inputValue.match(elementRegexp))
  }
  //this adds a value to the state depending on the button of the calculator for it to be displayed
  const addInputVal = (val, shown)=>{
    //this evaluates if the button is not hidden at the moment
    if(shown == 'show'){
      setInputVal(inputVal + val)
      //if its a special operation there has to be a normal operation next but not another special one
      if(specialOperations.indexOf(val) !== -1){
        setKeybState({
          setpad: 'show',
          oppad:'hide',
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
  const context = useContext(SetContext)

  const makeOperation = (e)=>{
    e.preventDefault()
    const inputValue = e.target.elements['keyboard-input'].value
    //it currently does nothing, is only used to prevent a form submission
  }
  return (
    <div id="setkeyboard">
      <form id='keyboard-form' onSubmit={makeOperation}>
        <input type="text" id='keyboard-input' value={inputVal} onChange={handleChange}></input>
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
          <button  className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal('N()', keyboardState.oppad)}}>{`N()`}</button>
          <button className={`keyboardbtn ${keyboardState.oppad}`} onClick={()=>{addInputVal("⊂", keyboardState.oppad)}}>⊂</button>
          <button className={`keyboardbtn ${keyboardState.ispartOf}`} onClick={()=>{addInputVal("∈", keyboardState.ispartOf)}}>∈</button>
        </div>
        
        
      </div>
    </div>
  )
}
