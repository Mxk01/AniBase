
import './App.css';
import React,{useState,useEffect} from 'react';
import Developers from './components/Developers';
 
 
function App() {


 
  
  return (

     
    <div className="App">
      {/* <button onClick={()=>{changeColors()}}>Dark theme </button> */}
      <div className="main__content"> 
    <Developers/>
    </div>

    
    
    </div>
  );
}

export default App;
