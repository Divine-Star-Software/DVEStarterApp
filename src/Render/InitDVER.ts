import {
  Engine,
  Scene,
  UniversalCamera,
  Vector3,
  CreateBox,
} from "@babylonjs/core/";

import { DivineVoxelEngineRender } from "@divinevoxel/core/Render";
import { RegisterTextureData } from "Render/RegisterTextureData";
import { InitRenderPlayer } from "Player/RenderPlayer";
import { RenderNodes } from "RednerNodes";

const options = {
  useSkyBox: true,
  useFloatingOrigin: false,
};
const worldWorker = new Worker(new URL("../Contexts/World/", import.meta.url), {
  type: "module",
});
const nexusWorker = new Worker(new URL("../Contexts/Nexus", import.meta.url), {
  type: "module",
});

const constructorWorkers: Worker[] = [];
for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
  constructorWorkers.push(
    new Worker(new URL("../Contexts/Constructor/", import.meta.url), {
      type: "module",
    })
  );
}

export async function InitDVER(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);

  const camera = new UniversalCamera("", new Vector3(0, 80, 0), scene);

  camera.attachControl(canvas);
  const DVER = new DivineVoxelEngineRender();

  RegisterTextureData(DVER);

  await DVER.init({
    worldWorker,
    constructorWorkers,
    nexusWorker,
    nexus: {
      enabled: true,
      autoSyncChunks: true,
    },
    scene,
  });

  RenderNodes.engine = engine;
  RenderNodes.scene = scene;
  RenderNodes.camera = camera;
  RenderNodes.DVER = DVER;
  engine.runRenderLoop(() => {
    scene.render();
  });

  if (options.useSkyBox) {
    const skybox = CreateBox("skyBox", { size: 800.0 }, scene);
    skybox.infiniteDistance = true;
    const bmat = DVER.nodes.materials.get("#dve_skybox");
    if (bmat) {
      //@ts-ignore
      skybox.material = bmat.getMaterial();
    }
  }

  if (options.useFloatingOrigin) {
    const oriign = new Vector3();
    scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
      oriign.x = camera.position.x;
      oriign.y = camera.position.y;
      oriign.z = camera.position.z;
    });
  }

  const sceneTool = DVER.getSceneTool();
  sceneTool.fog.setMode("animated-volumetric");
  sceneTool.options.doEffects(true).doAO(true).doRGB(true).doSun(true);
  sceneTool.levels
    .setSun(0.8)
    .levels.setBase(0.1)
    .fog.setColor(0.6)
    .fog.setMode("volumetric")
    .fog.setDensity(0.0005);
  RenderNodes.sceneTool = sceneTool;

  InitRenderPlayer(DVER);
}
