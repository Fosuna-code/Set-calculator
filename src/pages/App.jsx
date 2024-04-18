import React from "react";
import { SetProvider } from "../Context";
import SetAdding from "../components/SetAdding";

import Venn from "../components/Venn";
import Sidebar from "../components/Sidebar";
import Keyboard from "../components/Keyboard";
function App(){
    return (
        <div id="setprovider-container">
            <SetProvider>
                <section id="diagramPlusForm-container">
                    <Venn/>
                    <SetAdding/>
                </section>
                <section id="sidebar-container">
                    <Sidebar/>
                </section>
                <section id="keyboard-container">
                    <Keyboard/>
                </section>
            </SetProvider>
        </div>    
    )
}
export default App