import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import Loading from "./src/screens/Loading";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setNavigator } from "./src/navigationRef";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvier } from "./src/context/TrackContext";
import { Feather } from "@expo/vector-icons";

const listFlow = createStackNavigator({
  List: TrackListScreen,
  Detail: TrackDetailScreen
});

listFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <Feather name="list" size={25} />
};

const switchNavigator = createSwitchNavigator({
  Loading: Loading,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    Create: TrackCreateScreen,
    listFlow: listFlow,
    Account: AccountScreen
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvier>
      <LocationProvider>
        <AuthProvider>
          <App ref={nav => setNavigator(nav)} />
        </AuthProvider>
      </LocationProvider>
    </TrackProvier>
  );
};
