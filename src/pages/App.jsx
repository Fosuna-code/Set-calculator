import React, { useContext } from "react";
import { SetProvider, SetContext } from "../Context";
import SetAdding from "../components/SetAdding";
import SetContentForms from "../components/SetContentForms";

import Venn from "../components/Venn";
function App(){
    return (
        <div id="app">
            <section id="diagramPlusForm-container">
                <SetProvider>        
                    <Venn/>
                    <SetAdding/>

                    <SetContentForms/>
                </SetProvider>
            </section>   
        </div>    
    )
}
export default App