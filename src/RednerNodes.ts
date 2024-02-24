import { DivineVoxelEngineRender } from "@divinevoxel/core/Render";

import { UniversalCamera } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";

import { SceneTool } from "@divinevoxel/core/Render/Tools/SceneTool";

export class RenderNodes {
  static scene: Scene;
  static camera: UniversalCamera;
  static engine: Engine;
  static canvas: HTMLCanvasElement;
  static sceneTool: SceneTool;
  static DVER: DivineVoxelEngineRender;
}
