import { Observable } from "@divinestar/utils/Observers/Observable";
import { AddVoxelData } from "@divinevoxel/core/Types/Data/WorldData.types";

export class GameState {
  static selectedVoxel: Partial<AddVoxelData> = {
    id: "dve_dream_stone",
  };

  static observers = {
    voxelSelectOpened: new Observable<void>,
  }
}
