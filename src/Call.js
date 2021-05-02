
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import './styleOne.css';
import CallWrapper from "./caller";
import EndCallButton from "./endCallButton.png";
function Call(props) {
    const relativeCode = props.location.relativeCode;
    const [connecting, setConnecting] = useState(true);

    const [call] = useState(new CallWrapper('http://master.api.dd1369-meetings.com', relativeCode));
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {

    const [call] = useState(new CallWrapper('https://master.api.dd1369-meetings.com', relativeCode));
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {

        const connect = async () => {
            await call.connectToChimeMeeting(relativeCode);
            call.startWatching();
        }; connect();
        doTheCall();
    }, [call]);

    function doTheCall() {

          if(call.hasActiveCall()){
            const stream = async () => {
              call.setAudioInputDeviceToDefault();
              const mediaStream = await call.getVideoMediaStream();
              await call.broadcastVideo(mediaStream);
            };
              stream();
            }else {
                setTimeout(doTheCall, 100);
            }
          }



    return (
        <div>
            <div id="EndCall-Button">
                <Link to="./Start"><img src={EndCallButton} /></Link>
            </div>



            <div className="tileContainer">
                <div className="tileSubContainer" id="tiles">
                </div>
            </div>

            <audio id="audio-out"></audio>

        </div>
    );
    // return (
    // <div>
    //     <div className="center paddingheader">
    //         <h1 className ='headerstyle'>Call placeholder</h1>
    //     </div>
    // </div>
    // );
}

export default Call;
