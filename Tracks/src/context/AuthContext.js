import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "add_error": {
      return { ...state, errMesg: action.payload };
    }
    case "add_token": {
      return { token: action.payload };
    }
    case "remove_token": {
      return { token: null };
    }
    default: {
      return state;
    }
  }
};

const signUp = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "add_token", payload: response.data.token });
      navigate("List");
    } catch (error) {
      dispatch({ type: "add_error", payload: "Error in signing up" });
    }
  };
};

const signIn = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "add_token", payload: response.data.token });
      navigate("List");
    } catch (error) {
      dispatch({ type: "add_error", payload: "Error in signing in" });
    }
  };
};

const checkToken = dispatch => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "add_token", payload: token });
      navigate("List");
    } else {
      navigate("Signup");
    }
  };
};

const signOut = dispatch => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "remove_token" });
    navigate("Signin");
  };
};

export const { Provider, Context } = createDataContext(
  AuthReducer,
  { signUp, signIn, checkToken, signOut },
  { isSignedIn: false, token: null }
);
