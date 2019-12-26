import createDataContext from "./createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_location": {
      return { ...state, currentLocation: action.payload };
    }
    case "start_recording": {
      return { ...state, recording: true, track_name: action.payload };
    }
    case "stop_recording": {
      return { ...state, recording: false };
    }
    case "update_location": {
      return { ...state, location: [...state.location, action.payload] };
    }
    case "change_name": {
      return { ...state, name: action.payload };
    }
    case "reset": {
      return { ...state, location: [], track_name: "" };
    }
    default:
      return state;
  }
};

const startRecording = dispatch => {
  return term => {
    dispatch({ type: "start_recording", payload: term });
  };
};

const stopRecording = dispatch => {
  return () => {
    dispatch({ type: "stop_recording" });
  };
};

const addLocation = dispatch => {
  return (location, recording) => {
    dispatch({ type: "add_location", payload: location });
    if (recording) {
      console.log("Adding loc");
      dispatch({ type: "update_location", payload: location });
    }
  };
};

const changeName = dispatch => {
  return name => {
    dispatch({ type: "change_name", payload: name });
  };
};

const reset = dispatch => {
  return () => {
    dispatch({ type: "reset" });
  };
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset
  },
  {
    currentLocation: null,
    location: [],
    recording: false,
    name: "Start Recording",
    track_name: ""
  }
);
