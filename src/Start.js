import React,{useState} from "react";
import {Redirect} from "react-router-dom";

function Start() {
    const [relativeCode,setRelativeCode] = useState(null);
    const [approvedCode,setApprovedCode] = useState(false);
    const codeRegex = /^[A-Z0-9]{3}\-[A-Z0-9]{3}$/;
    const handleCodeChange = (e) =>{
        setRelativeCode(e.target.value);
    }
    const checkCode = (e) => {
      e.preventDefault();
      if(codeRegex.test(relativeCode)){
          setApprovedCode(true)
      }else{
        window.alert("Felaktig kod.\n\nBehöver vara på formen: XXX-XXX \n\nSamt endast stora bokstäver och siffor");
      }
    };
    return (

    <div>
            <div className="center paddingheader">
                <h1 className='headerstyle'>Dogood</h1>
                <link rel="stylesheet" href="styleOne.css" />
            </div>

            <div className="center">
                <form onSubmit={checkCode}>
                    <label htmlFor = "code">Skriv in kod du fått per sms:</label><br/>
                    <input type = "text" id = "code" placeholder="t.ex 123-456" value={relativeCode} onChange={handleCodeChange} required></input><br/>
                    <input type = "submit" value = "Öppna samtal"></input>
                </form>
            </div>
            {approvedCode && <Redirect to={{pathname:"/Call",relativeCode:relativeCode}}>}


    </div>

    );

}

export default Start;
