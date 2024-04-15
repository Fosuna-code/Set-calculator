import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SetContext } from "../Context";
import { VennDiagram } from "venn.js";

import * as d3 from "d3";
function Venn(){
    const context = useContext(SetContext);
    
    useEffect(() => {
        var sets = context.sets;
        
        var chart = VennDiagram()
        d3.select("#venn").datum(sets).call(chart);

      }, [context.sets, context.render]); //Every time the context changes, the diagram does aswell
    return(
        <div id="venn"> 
        </div>
    )
}
export default Venn;