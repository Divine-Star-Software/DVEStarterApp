import { DivineVoxelEngineNexus } from "@divinevoxel/core/Nexus/DivineVoxelEngineNexus";
import { INIT_NEXUS_PLAYER } from "@divinevoxel/ecs/Player/Nexus/InitNexusPlayer";
export async function InitNexusPlayer(DVEN: DivineVoxelEngineNexus) {
 const nexusPlayer =  await INIT_NEXUS_PLAYER(DVEN);
  nexusPlayer.node.setPosition(0,200,0);
  setInterval(()=>{
    nexusPlayer.update();
  },10);
}
