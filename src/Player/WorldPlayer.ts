import { DivineVoxelEngineWorld } from "@divinevoxel/core/World/DivineVoxelEngineWorld";
import { INIT_WORLD_PLAYER } from "@divinevoxel/ecs/Player/World/InitWorldPlayer";
import { PlaceVoxelTask, PlayerTasks, RemoveVoxelTask } from "./Player.types";
export async function InitWorldPlayer(DVEW: DivineVoxelEngineWorld) {
  const worlPlayer = await INIT_WORLD_PLAYER(DVEW);

  const dataTool = DVEW.getDataTool();
  const brush = DVEW.getBrush();
  DVEW.TC.registerTasks<PlaceVoxelTask>(
    PlayerTasks.Place,
    ([location, data]) => {
      if (location[0] == Infinity) return;
      if (!dataTool.setXYZ(...location).loadIn() || !dataTool.isAir()) return;
      brush
        .setXYZ(...location)
        .setId(data.id!)
        .paintAndAwaitUpdate();
    }
  );
  DVEW.TC.registerTasks<RemoveVoxelTask>(PlayerTasks.Remove, ([location]) => {
    if (location[0] == Infinity) return;
    brush.setXYZ(...location).eraseAndAwaitUpdate();
  });

  setInterval(() => {
    worlPlayer.update();
  }, 100);
}
