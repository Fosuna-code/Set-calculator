import React, { useContext } from "react";
import { SetContext, SetProvider } from "../Context";
import SetAdding from "../components/SetAdding/SetAdding";

import Venn from "../components/Venn/Venn";
import Sidebar from "../components/Sidebar/Sidebar";
import Keyboard from "../components/Keyboard/Keyboard";
function App(){
    const context = useContext(SetContext)
    return (
        <div id="setprovider-container">
            <SetProvider>
                
                    <Venn/>
                    
                        <SetAdding/>
                    
                <Sidebar/>
                <Keyboard/>
            </SetProvider>
        </div>    
    )
}
export default App