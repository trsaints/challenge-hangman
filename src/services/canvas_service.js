export function drawFail(callbacks, fails) {
  const gameFails = {
    0: (ctx, startX) => drawLine(startX, 160, 200, 240, "black", ctx),
    1: (ctx, startX) => drawLine(startX, 160, 120, 240, "black", ctx),
    2: (ctx, startX) => drawLine(startX, 100, 200, 160, "black", ctx),
    3: (ctx, startX) => drawLine(startX, 100, 120, 160, "black", ctx),
    4: (ctx, startX) => drawLine(startX, 90, startX, 160, "black", ctx),
    5: (ctx, startX) => drawCircle(startX, 70, 20, "black", ctx),
  };

  const canvas = callbacks.getElement("game-canvas");
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  const { width } = rect;
  let startX = width / 2;

  return gameFails[fails](ctx, startX);
}

export function drawGallow(callbacks) {
  const canvas = callbacks.getElement("game-canvas");

  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  const { width } = rect;
  let startX = width / 2;

  drawLine(startX, 20, 160, 50, "black", ctx);
  drawLine(startX, 20, 80, 20, "black", ctx);
  drawLine(startX / 2, 20, 80, 300, "black", ctx);
  drawLine(startX / 4, 300, 120, 300, "black", ctx);
}

export function adjustCanvas(callbacks) {
  const canvas = callbacks.getElement("game-canvas");
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);

  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}

function drawCircle(x, y, radius, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawLine(x, y, x2, y2, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.stroke();
}
