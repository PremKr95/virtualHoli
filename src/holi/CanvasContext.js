import React, { useContext, useRef, useState } from "react";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const prepareCanvas = () => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth*2;
    canvas.height = window.innerHeight*2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = global.selectedColorPaint || "red";
    context.lineWidth = 10;
    contextRef.current = context;
  };

  const startDrawing = (nativeEvent) => {
    const context = contextRef.current;
    context.strokeStyle = global.selectedColorPaint
    contextRef.current= context;
    const { pageX, pageY } = nativeEvent && nativeEvent.changedTouches[0];
    contextRef.current.beginPath();
    contextRef.current.moveTo(pageX, pageY-40);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { pageX, pageY } = nativeEvent && nativeEvent.changedTouches[0];
    contextRef.current.lineTo(pageX, pageY-40);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  // web
  const startDrawingWeb = ({nativeEvent}) => {
    const context = contextRef.current;
    context.strokeStyle = global.selectedColorPaint
    contextRef.current= context;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY-40);
    setIsDrawing(true);
  };

  const drawWeb = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.lineTo(offsetX, offsetY-40);
    contextRef.current.stroke();
  };
   

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        draw,
        startDrawingWeb,
        drawWeb
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);