import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SetContext } from "../Context";
import { VennDiagram } from "venn.js";

import * as d3 from "d3";
function Venn(){
    const context = useContext(SetContext);

    useEffect(() => {
        var sets = context.drawInstructions();
        
        var chart = VennDiagram()
        d3.select("#venn").datum(sets).call(chart);

      //Every time the context changes, the diagram does aswell
      //or every time the set sizes are altered, a render is forced
      }, [context.setelements]); 
    return(
        <div id="venn"> 
        </div>
    )
}
export default Venn;