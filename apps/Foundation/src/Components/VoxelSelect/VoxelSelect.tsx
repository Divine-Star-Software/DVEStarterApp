import { AppVoxelData } from "Data/VoxelData";
import "./VoxelSelect.css";
import { VoxelData } from "@divinevoxel/core";
import { useState } from "react";
import { GameState } from "GameState";

function Voxel({ data, onClick }: { data: VoxelData; onClick: Function }) {
  return (
    <div className="voxel" onClick={() => onClick()}>
      <div className="voxel-title">
        <h2>{data.id}</h2>
      </div>
      <div className="voxel-image-container">
        <img className="voxel-image" src={`/assets/textures/${data.id}/default.png`} />
      </div>
    </div>
  );
}
export function VoxelSelect() {
  const [show, setShow] = useState(false);
  GameState.observers.voxelSelectOpened.subscribe(VoxelSelect, () =>
    setShow(true)
  );
  return (
    <div
      style={{ visibility: `${show ? "visible" : "hidden"}` }}
      className="voxel-select"
    >
      {AppVoxelData.map((_) => (
        <Voxel
          data={_}
          onClick={() => {
            setShow(false);
            GameState.selectedVoxel = _;
          }}
        />
      ))}
    </div>
  );
}
