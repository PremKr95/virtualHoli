import React from 'react';
import MyIcon from '../assets/jobinterview.png'
import Employee from '../assets/employee.png'

const HomeScreen = () => {


    return (
        <div style={{overflowY: 'sc]'}}>
            <div style={{display: 'flex', paddingTop: 60, paddingRight: 0, paddingLeft: 80 , flexDirection: 'column', height: window.innerHeight, width: window.width , backgroundColor: '#F1B09F', background: 'linear-gradient(#EB967C,#EE9E86,#F1B09F)'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                <img style={{ height: 48, width: 48, marginRight: 10}} src={MyIcon}/>
                    <div style={{fontSize: 28, fontWeight: 'bold'}}>Interview Ready
                    <div style={{fontSize: 14, fontWeight: 'bold'}}>Helping others for Interview</div> </div>
                </div>
                <div style={{display: 'flex',marginLeft: 80, justifyContent: 'space-between', alignItems: 'center', marginTop: 100}}>
                    <div style={{fontSize: 40, fontWeight: 'bold' }}>Free Preparation For <br/> Interview.
                    <div style={{fontSize: 30,fontWeight: 'normal',  marginTop: 20, wordSpacing: 2}}>Unlock you hidden skills.</div></div>
                    <img style={{ height: 400, width: 400}} src={Employee}/>
                </div>
            </div>
            <div style={{display: 'flex', height: window.innerHeight, width: window.width , backgroundColor: '#FFF'}}>
                <p>a</p>
            </div>
        </div>
    )
}

export default HomeScreen;
