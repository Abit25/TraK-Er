import React, { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { location, track_name },
    reset
  } = useContext(LocationContext);

  const saveTrack = async () => {
    console.log("Saving...");
    await createTrack(track_name, location);
    reset();
    console.log("Done", reset);
  };
  return { saveTrack };
};
