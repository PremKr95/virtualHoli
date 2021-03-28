import React, { useEffect } from "react";
import { useCanvas } from "./CanvasContext";

export function Canvas() {
  const {
    canvasRef,
    prepareCanvas,
    startDrawing,
    finishDrawing,
    draw,
    startDrawingWeb,
    drawWeb
  } = useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
    style={{ height: '70%', width: '100%' }}
      onMouseDown={startDrawingWeb}
      onMouseUp={finishDrawing}
      onMouseMove={drawWeb}
      onTouchStart={startDrawing}
      onTouchEnd={finishDrawing}
      onTouchMove={draw}
      ref={canvasRef}
    />
  );
}