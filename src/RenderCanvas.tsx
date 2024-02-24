import { InitDVER } from "Render/InitDVER";
import { useEffect, useRef } from "react";

export function RenderCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    InitDVER(ref.current);
    ref.current.addEventListener("click", () => {
      ref.current!.requestPointerLock();
    });
  }, []);

  return (
    <div className="render-canvas-container">
      <canvas ref={ref} id="render-canvas" />
    </div>
  );
}
