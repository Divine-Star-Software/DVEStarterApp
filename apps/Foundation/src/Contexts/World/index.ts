import { StartWorld } from "@divinevoxel/foundation/Default/Init/StartWorld";
import { Generate } from "./Gen/Generate";
import { InitWorldPlayer } from "Player/WorldPlayer";
import { AppVoxelData } from "../../Data/VoxelData";
console.log("Start world")

const { DVEW } = await StartWorld({
  nexusEnabled: true,
  voxels: AppVoxelData,
});

DVEW.TC.registerTasks("start-world", async () => {
  await Generate(DVEW);
  InitWorldPlayer(DVEW);
});
