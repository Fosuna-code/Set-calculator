import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SetContext } from "../Context";
import { VennDiagram } from "venn.js";
import { getRandomHex } from "../utilities/randomHexGenerator";
import * as d3 from "d3";
const colors = []

function Venn(){
    const context = useContext(SetContext);
    
    useEffect(() => {
        var sets = context.drawInstructions();
        
        var chart = VennDiagram()
        d3.select("#venn").datum(sets).call(chart);
        
        console.log(d3.selectAll('#venn path')._groups[0][0]?.attributes.style.value)
        
        for(let i=0; i<context.setelements.length; i++){
            if(colors.length <= i){
                colors.push(getRandomHex())
            }
            console.log(colors)
            d3.selectAll('#venn path')._groups[0][i].attributes.style.value = `fill-opacity: 0.3; fill: ${colors[i]} `
        }
      //Every time the context changes, the diagram does aswell
      //or every time the set sizes are altered, a render is forced
      }, [context.setelements]); 

    return(
        <div id="venn"> 
        </div>
    )
}
export default Venn;