import { DivineVoxelEngineWorld } from "@divinevoxel/core/World/DivineVoxelEngineWorld";
import { RegisterVoxelData } from "Contexts/World/RegisterVoxelData";
import { Generate } from "./Gen/Generate";
import { InitWorldPlayer } from "Player/WorldPlayer";

const DVEW = new DivineVoxelEngineWorld();

RegisterVoxelData(DVEW);

await DVEW.init();

await Generate(DVEW);
InitWorldPlayer(DVEW);
