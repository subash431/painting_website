document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("paintCanvas");
  const context = canvas.getContext("2d");
  let isPainting = false;
  let lastX = 0;
  let lastY = 0;
  let hue = 0;
  let brushSize = 5;
  let color = "black";
  let drawingHistory = []; // Array to store drawing actions

  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseout", stopPainting);

  function startPainting(event) {
    isPainting = true;
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }

  function stopPainting() {
    isPainting = false;
    // Push current state to history when painting stops
    if (isPainting === false) {
      drawingHistory.push(
        context.getImageData(0, 0, canvas.width, canvas.height)
      );
    }
  }

  function draw(event) {
    if (!isPainting) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }

  // Set brush color
  document.getElementById("blackBrush").addEventListener("click", function () {
    color = "black";
  });

  document.getElementById("pinkBrush").addEventListener("click", function () {
    color = "#f50057";
  });

  document.getElementById("blueBrush").addEventListener("click", function () {
    color = "#2879ff";
  });

  document.getElementById("yellowBrush").addEventListener("click", function () {
    color = "yellow";
  });

  // Clear canvas
  document.getElementById("clearBtn").addEventListener("click", function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawingHistory = []; // Clear drawing history when canvas is cleared
  });

  // Eraser
  document.getElementById("eraserBtn").addEventListener("click", function () {
    color = "white";
  });

  // Brush size
  document.getElementById("brushSize").addEventListener("input", function () {
    brushSize = this.value;
  });

  // Undo functionality
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
      event.preventDefault();
      undoLastDrawing();
    }
  });

  function undoLastDrawing() {
    if (drawingHistory.length > 0) {
      context.putImageData(drawingHistory.pop(), 0, 0);
    }
  }
});
// Brush size
document.getElementById("brushSize").addEventListener("input", function () {
  brushSize = parseInt(this.value);
  document.getElementById("brushSizeDisplay").textContent = brushSize;
});
