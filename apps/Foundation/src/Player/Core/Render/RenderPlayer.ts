import { Vector3 } from "@babylonjs/core/Maths/math.vector"
import type { Mesh } from "@babylonjs/core/Meshes/mesh"
import type { Scene } from "@babylonjs/core/scene";

import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera"
import { TransformNode } from "@babylonjs/core/Meshes/transformNode"
import { PlayerManager } from "../Data/PlayerManager"
import { PlayerPhysicsStatesValues } from "../Data/PlayerPhysicsData"
import { PlayerPickCube } from "./PlayerPickCube"
import { DivineVoxelEngineRender } from "@divinevoxel/core/Contexts/Render/DivineVoxelEngineRender"
import { Camera } from "@babylonjs/core";
import { RenderNodes } from "Classes/RednerNodes"

/*
PLAYER 
*/

type PlayerRenderNodes = {
  model: Mesh;
  camNode: TransformNode;
};
export class RenderPlayer {
  settings = {
    doWalkEffect: true,
  };

  active = true;

  direction: Vector3;
  sideDirection: Vector3;
  xzd: Vector3;
  cameraRotation: Vector3;
  picker: PlayerPickCube;

  constructor(
    public manager: typeof PlayerManager,
    public nodes: RenderNodes,
    public model: PlayerRenderNodes
  ) {
    this.direction = new Vector3();
    this.sideDirection = new Vector3();
    this.xzd = new Vector3();
    this.cameraRotation = new Vector3();
    this.picker = new PlayerPickCube(
      DivineVoxelEngineRender.instance,
      nodes,
      this
    );
  }

  render() {
    if (!this.active) return;
    //update physics data
    const camera = this.nodes.camera;
    camera.getDirectionToRef(Vector3.Forward(), this.direction);
    camera.getDirectionToRef(Vector3.Left(), this.sideDirection);
    PlayerManager.physics.direction.set(
      this.direction.x,
      this.direction.y,
      this.direction.z
    );
    PlayerManager.physics.sideDirection.set(
      this.sideDirection.x,
      this.sideDirection.y,
      this.sideDirection.z
    );
    const rotation = camera.rotation;
    PlayerManager.physics.rotation.set(rotation.x, rotation.y, rotation.z);

    if (this.settings.doWalkEffect) {
      let et = performance.now();
      this.xzd.x = this.direction.x;
      this.xzd.z = this.direction.z;
      this.xzd.normalize();
      if (
        PlayerManager.physics.states.movement ==
        PlayerPhysicsStatesValues.walkingForward
      ) {
        let runFactor = 0.02 * PlayerManager.physics.states.running;
        let factor = 0.008 + runFactor;
        let yd = Math.abs(this.direction.y) > 0.5 ? 0 : 1;
        this.cameraRotation.x =
          Math.cos(et / 100) * factor * Number(this.xzd.x.toFixed(1)) * yd;
        this.cameraRotation.z =
          Math.cos(et / 100) * factor * Number(this.xzd.z.toFixed(1)) * yd;
        this.cameraRotation.y = Math.abs(Math.sin(et / 100)) * factor;
      } else {
        this.cameraRotation.scaleInPlace(0.5);
      }
      this.model.camNode.rotation = Vector3.Lerp(
        this.cameraRotation,
        this.model.camNode.rotation,
        0.25
      );
    }
  }
}
