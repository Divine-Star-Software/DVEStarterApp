import {
  PlayerManager,
  PlayerPhysicsData,
  PlayerStatsData,
} from "../Data/index";
import { CreatePromiseCheck } from "@divinestar/utils/Intervals/CreatePromiseCheck";
import { ThreadComm } from "@divinestar/threads";

export async function SetUpPlayerData(TC: typeof ThreadComm) {
  let playerDataReady = false;
  TC.registerTasks("connect-player-tags", (data: any[]) => {
    PlayerManager.physics = new PlayerPhysicsData(data[0], data[1]);
    PlayerManager.stats = new PlayerStatsData(data[2], data[3]);
    playerDataReady = true;
  });

  await CreatePromiseCheck({
    check: () => {
      return playerDataReady;
    },
    checkInterval: 1,
  });
}
