import createDataContext from "./createDataContext";
import tracker from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default: {
      return state;
    }
  }
};

const createTrack = dispatch => {
  return async (track_name, location) => {
    console.log("Saved");
    const name = track_name;
    try {
      await tracker.post("/tracks", { name, location });
    } catch (error) {
      console.log(error.message);
    }
  };
};
const fetchTracks = dispatch => {
  return async () => {
    const response = await tracker.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: response.data });
  };
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { createTrack, fetchTracks },
  []
);
