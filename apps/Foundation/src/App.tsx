import { useDVE } from "./Hooks/useDVE";
import { useState } from "react";
import {
  CubeTexture,
  DefaultRenderingPipeline,
  ImageProcessingConfiguration,
  AxesViewer,
} from "@babylonjs/core";
//import "@babylonjs/core/Debug/debugLayer"; // Import the debug layer
//import "@babylonjs/inspector"; // Import the inspector
import InitDVER from "@divinevoxel/babylon-renderer/Defaults/Foundation/PBR/InitDVEBRPBR";
import { VoxelSelect } from "./Components/VoxelSelect/VoxelSelect";
import { AppTextureData } from "./Data/TextureData";
import { InitRenderPlayer } from "Player/RenderPlayer";
const worldWorker = new Worker(new URL("./Contexts/World/", import.meta.url), {
  type: "module",
});
const nexusWorker = new Worker(new URL("./Contexts/Nexus", import.meta.url), {
  type: "module",
});
const constructorWorkers: Worker[] = [];
for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
  constructorWorkers.push(
    new Worker(new URL("./Contexts/Constructor/", import.meta.url), {
      type: "module",
    })
  );
}

export function App() {
  const [ready, setReady] = useState(false);
  const { DVECanvas, nodes } = useDVE({
    nexusWorker,
    staturate: async (DVER, observers) => {
      observers.ready.subscribe("", async () => {
        console.log("SATURARE", nodes.scene);
        const scene = nodes.scene;

        const renderer = await InitDVER({
          textureTypes: [],
          substances: [],
          scene: scene,

          textureData: AppTextureData,
        });
        /* 
        scene.debugLayer.show({
          showExplorer: true,
          showInspector: true,
          embedMode: false,
        });
    */

        /*    const view = new AxesViewer(scene);
        view.xAxis.position.y += 80;
        view.yAxis.position.y += 80;
        view.zAxis.position.y += 80; */

        //  postprocess.exposure = 1.5;
        console.log("BEFORE DVER INIT");
        nodes.core.renderer = renderer;
        await DVER.init({
          core: nodes.core as any,
          renderer,
          worldWorker,

          constructorWorkers,
        });

        console.log("AFTER DVER INIT");
        setReady(true);
        /*    nodes.sceneTool.levels
          .setSun(0.5)
          .levels.setBase(0)
          .fog.setColor(0.1)
          .fog.setMode("volumetric")
          .fog.setDensity(0.0); */
        (window as any).nodes = nodes;
        await DVER.threads.world.runAsyncTasks("start-world", []);

        await InitRenderPlayer(DVER, nodes);
      });
    },
    useSkyBox: true,
    textureAssetPath: "assets/textures",
  });

  return (
    <>
      <VoxelSelect />
      <div className="render-canvas-container">{DVECanvas}</div>
    </>
  );
}
