import React, {useEffect, useState} from 'react';
import './App.css';
import Webcam from "react-webcam";


const CameraScreen = () => {
  const canvasRef = React.createRef();
  const contextRef = React.createRef();
  const [isDrawing, setIsDrawing] = useState(false)

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 50;
    contextRef.current = context;
  };

  useEffect(() => {
    prepareCanvas()
  }, [])

  const startDrawing = ({ nativeEvent }) => {
    console.log("startDrawing -> startDrawing", startDrawing)
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    console.log("finishDrawing -> finishDrawing", finishDrawing)
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    // alert("T"+isDrawing)
    // if (!isDrawing) {
    //   return;
    // }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }
  
    return (
      <>
        <Webcam audio={false} videoConstraints={{  }} />
        <div style={{
          position: 'absolute',
          top: 70,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          opacity: 0.1
        }}>
           <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
          />
        </div>
      </>
    );
  };

export default CameraScreen;

