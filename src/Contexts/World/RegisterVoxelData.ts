import { DivineVoxelEngineWorld } from "@divinevoxel/core/World/DivineVoxelEngineWorld";
import { AppVoxelData } from "../../Data/VoxelData";
export function RegisterVoxelData(DVEW: DivineVoxelEngineWorld) {
  DVEW.dataRegister.voxels.registerData(AppVoxelData);
}
