import { DivineVoxelEngineNexus } from "@divinevoxel/foundation/Contexts/Nexus/DivineVoxelEngineNexus";
import { DVEFDataCore } from "@divinevoxel/foundation/Data/DVEFDataCore";
import { InitNexusPlayer } from "Player/NexusPlayer";

const dataCore = new DVEFDataCore();
const DVEN = new DivineVoxelEngineNexus({
  data: dataCore,
});
console.log("Start nexus")
await DVEN.init();
(self as any).DVEN = DVEN;

InitNexusPlayer(DVEN);
