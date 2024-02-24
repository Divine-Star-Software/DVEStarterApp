import { DivineVoxelEngineRender } from "@divinevoxel/core/Render/DivineVoxelEngineRender";
import { INIT_RENDER_PLAYER } from "@divinevoxel/ecs/Player/Render/InitRenderPlayer";
import { RenderNodes } from "RednerNodes";
import { CreateBox } from "@babylonjs/core";
import { SetUpControls } from "./SetUpControls";
export async function InitRenderPlayer(DVER: DivineVoxelEngineRender) {
  const playerModel = CreateBox("", { width: 0.8, depth: 0.8, height: 2 });

  const renderPlayer = await INIT_RENDER_PLAYER(
    RenderNodes.scene,
    RenderNodes.camera,
    DVER,
    playerModel
  );

  renderPlayer.active = true;
  SetUpControls(DVER, renderPlayer);
}
