import React from "react";


function Start() {
    return (
    <div>
        <div className="center paddingheader">
            <h1 className='headerstyle'>Dogood</h1>
            <link rel="stylesheet" href="styleOne.css" />
        </div>


        <div className="center">
            <form action="/Call">
                <label for = "code">Skriv in kod du fått per sms:</label><br/>
                <input type = "text" id = "code"></input><br/>
                <input type = "submit" value = "Öppna samtal"></input>
            </form>
        </div>
    </div>

    );
}

export default Start;
