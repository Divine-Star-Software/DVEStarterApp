import { DivineVoxelEngineWorld } from "@divinevoxel/core/Contexts/World/DivineVoxelEngineWorld";
import { WorldGen } from "./WorldGen";
import { BuilderTool } from "@divinevoxel/foundation/Default/Tools/Build/BuilderTool";
import { TaskTool } from "@divinevoxel/foundation/Default/Tools/Tasks/TasksTool";
export async function Generate(DVEW: DivineVoxelEngineWorld) {
  console.log("start world gen");
  const numChunks = 2;
  let startX = -16 * numChunks;
  let startZ = -16 * numChunks;
  let endX = 16 * numChunks;
  let endZ = 16 * numChunks;

  const builder = new BuilderTool();

  const tasks = new TaskTool();
  tasks.setFocalPoint(["main", 0, 0, 0]);

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      WorldGen.generateWorldColumn(x, z);
      tasks.worldSun.queued.add(["main", x, 0, z]);
    }
  }

  console.log("start propagation");
  await tasks.propagation.queued.runAndAwait();
  console.log("end propagation");
  console.log("start world sun");
  await tasks.worldSun.queued.runAndAwait();
  console.log("end world sun");

  for (let x = startX; x < endX; x += 16) {
    for (let z = startZ; z < endZ; z += 16) {
      builder.setXZ(x, z).buildColumn();
    }
  }
}
