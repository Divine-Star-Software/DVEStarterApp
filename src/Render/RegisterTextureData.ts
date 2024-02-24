import { DivineVoxelEngineRender } from "@divinevoxel/core/Render";
import { AppTextureData } from "../Data/TextureData";

export function RegisterTextureData(DVER: DivineVoxelEngineRender) {
  DVER.nodes.textures.defaultTexturePath = "/textures/"
  DVER.nodes.textures.registerTexture(AppTextureData);
}
