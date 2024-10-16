import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SetContext } from "../../Context";
import { VennDiagram } from "venn.js";
import * as d3 from "d3";

function Venn(){
    const context = useContext(SetContext);
    
    useEffect(() => {
        //extracts the data necessary to diagram the sets and intersections
        var sets = context.drawInstructions();
        var colors = context.colors;
        console.log(colors)
        //diagrams the data extracted from the context
        var chart = VennDiagram()
        d3.select("#venn").datum(sets).call(chart);
        //extracts every set's venn diagram to change its color to a random one using the d3 library
        for(let i=0; i<context.setelements.length; i++){
            d3.selectAll('#venn path')._groups[0][i].attributes.style.value = `fill-opacity: 0.6; fill: ${colors[i]}`
            console.log(d3.selectAll('#venn path')._groups[0][i].attributes)
        }
      //Every time the context changes, the diagram does aswell
      //or every time the set sizes are altered, a render is forced
      }, [context.setelements]); 

    return(
        <div id="diagramms-container" className={`${context.isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            <div id="venn"> 
            </div>
        </div>
    )
}
export default Venn;