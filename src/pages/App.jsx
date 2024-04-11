import React, { useContext } from "react";
import { SetProvider, SetContext } from "../Context";
import SetAdding from "../components/SetAdding";

import Venn from "../components/Venn";
function App(){
    return (
        <SetProvider>        
            <div className="container">
                <Venn/>
                {/* <SetAdding name="U"/> */}
                <SetAdding name="A"/>
                <SetAdding name="B"/>
            </div>
          </SetProvider>
    )
}
export default App