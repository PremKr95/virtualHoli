import React from 'react'
import { Canvas } from './holi/Canvas'
import { ClearCanvasButton } from './holi/ClearCanvasButton';
import Webcam from 'react-webcam';
import styles from './App.css';
import MyIcon from './assets/camera.png'
import Screenshot from './assets/browser.png'
import { useCanvas } from './holi/CanvasContext'
// import { useScreenshot } from 'use-react-screenshot'

const colorArr = ['red', 'blue', 'green', 'yellow']

function App() {

  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState(0);
  const { clearCanvas } = useCanvas()


  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );

  const changeCamera = () => {
    const _deviceArr = devices.filter(dev => dev.deviceId !== deviceId)
    setDeviceId(_deviceArr[0].deviceId)
  }

  const screenshot = () => {
    alert("ScreenShot")
  }

  const changeColor = (id, it) => {
    setSelectedColor(id)
    global.selectedColorPaint = it;
    console.log("changeColor -> global.selectedColorPaint", global.selectedColorPaint)
  }

  const renderColorPicker = () => {
    return (
      <div style={{display: 'flex', position: 'absolute', bottom: 0, height: 100, width: '100%', justifyContent: 'space-evenly', zIndex: 100000}}>
        {colorArr.map((it, index) => {
          return (
          <div onClick={() => changeColor(index, it)} style={{display: 'flex', height: 70, width: 70, borderRadius: 35, backgroundColor: selectedColor === index ? 'black' : 'white', alignContent: 'center', justifyContent:'center', alignItems: 'center' }}>
              <div style={{height: 60, width: 60, borderRadius: 30, backgroundColor: it, alignSelf: 'center'}}>
              </div>
          </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{height: '100%', width: '100%' }}>
      <div style={{fontSize: 28, alignSelf: 'center', textAlign:'center', marginTop: 5}}>VIRTUAL HOLI</div>
      {/* <div onClick={clearCanvas} style={{zIndex: 1, position: 'absolute', top: 10, right: 10}}>Reset</div> */}
      <Webcam audio={false} height style={{position: 'fixed', top:0, left: 0, height: '80vh', width: '100vw'}} videoConstraints={{deviceId}}/>
        {devices && devices.length > 1 &&
          <img onClick={changeCamera} style={{zIndex: 10000, position: 'absolute', bottom: '20vh', left: 8, height: 48, width: 48, marginRight: 10}} src={MyIcon}/>
        }
        <img onClick={screenshot} style={{zIndex: 10000, position: 'absolute', bottom: '20vh', right: 8, height: 48, width: 48, marginRight: 10}} src={Screenshot}/>
        {renderColorPicker()}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '97%'
        }}>
      <Canvas/>
      </div>
    </div>
  );
}

export default App;