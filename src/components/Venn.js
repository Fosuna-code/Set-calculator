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

      }, []); // The empty dependency array ensures this effect runs only once, like componentDidMount
    
    return(
        <div id="venn"> 
        </div>
    )
}
export default Venn;