import { DivineVoxelEngineConstructor } from "@divinevoxel/core/Constructor/DivineVoxelEngineConstructor";
import { RegisterVoxelContrusctors } from "Contexts/Constructor/RegisterVoxelContrusctors";

const DVEC = new DivineVoxelEngineConstructor();
RegisterVoxelContrusctors(DVEC);

await DVEC.init();
