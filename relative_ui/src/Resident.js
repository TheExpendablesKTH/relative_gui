
import React,{ useState, useEffect } from "react";
import {Link} from "react-router-dom";
import backarrow from './back-arrow.png';
import axios from 'axios';

function Resident(){
    //let residents = ["Marie Curie","Pierre Curie"];
    const [loading, setLoading] = useState(true);
    const [residents,setResidents] = useState(null);
    const api_url = "http://mock.api.dd1369-meetings.com/users";
    useEffect(() => {
        const fetchData = async () => {
                const result = await axios(api_url);
                setResidents(result.data.users);
                setLoading(false);
            };
            fetchData();
        },[]);
    
    return (
        <div>
            <div className="button"></div>
            <div className="flexbox">
            <div className="flexbox topAligned">
                <Link to = "/"><img src={backarrow} /></Link>
                
            </div>
            <div className="flexbox topAligned">
                <h1 className="extra-large-text center">Boende</h1>
                <div className="scroll-container">
                    <div className="scroll-header">
                        <p className="center">Klicka på namnet på valda boende</p>
                        
                    </div>
                    <div className="scroll-outer largeScroll">
                        <div className="scroll-inner">
                            {(loading || residents==null) ? (
                                <p>loading...</p>
                            ) : (
                                residents.map(resident => 
                                    (
                                        <Link to ={"/Relative?resident_id="+resident.id}><p className="scroll-row"><span className="name-plate">{resident.name}</span></p></Link>
                                    ))
                            )
                            
                            }
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flexbox"></div>
            </div>
        </div>
    );
}

export default Resident;