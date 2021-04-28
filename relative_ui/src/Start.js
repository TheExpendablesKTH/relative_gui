import React,{useState} from "react";
import {Link} from "react-router-dom";

function Start() {
    const [relativeCode,setRelativeCode] = useState(null);
    const handleCodeChange = (e) =>{
        setRelativeCode(e.target.value);
    }
    return (
    
    <div>
            <div className="center paddingheader">
                <h1 className='headerstyle'>Dogood</h1>
                <link rel="stylesheet" href="styleOne.css" />
            </div>

            <div className="center">
                <form> 
                    <label htmlFor = "code">Skriv in kod du fått per sms:</label><br/>
                    <input type = "text" id = "code" placeholder="t.ex 123-456" value={relativeCode} onChange={handleCodeChange} required></input><br/>
                    <Link to ={{pathname:"/Call",relativeCode:relativeCode}}><input type = "submit" value = "Öppna samtal"></input></Link>
                </form>
            </div>
        
        
    </div>

    );
}


export default Start;
