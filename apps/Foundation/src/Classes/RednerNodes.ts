import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render";

import { UniversalCamera, type Camera } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene";
import { Engine } from "@babylonjs/core/Engines/engine";

import { SceneTool } from "@divinevoxel/babylon-renderer/Defaults/Foundation/Tools/SceneTool";
import { DVEFBRCore } from "./DVEFBRCore";

export class RenderNodes {
  scene: Scene;
  camera: UniversalCamera;
  engine: Engine;
  canvas: HTMLCanvasElement;
  sceneTool: SceneTool;
  core: DVEFBRCore;
  DVER: DivineVoxelEngineRender;
}
