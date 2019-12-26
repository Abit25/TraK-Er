import React, { useState, useCallback, useContext } from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import Spacer from "../components/Spacer";
import useSaveTrack from "../hooks/useSaveTrack";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const TrackCreateScreen = ({ isFocused }) => {
  const {
    addLocation,
    state,
    stopRecording,
    startRecording,
    changeName
  } = useContext(Context);
  const { saveTrack } = useSaveTrack();
  const [term, setTerm] = useState("");
  const callback = useCallback(
    location => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );
  const { error } = useLocation(isFocused || state.recording, callback);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgb(32,32,32)" }}
      forceInset={{ top: "always" }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text h2 style={{ color: "white", fontFamily: "Copperplate" }}>
          RUN NOW ?
        </Text>
        <Spacer />
        <Map />
        <View style={styles.form}>
          <Spacer>
            <Input
              label="Name your track"
              autoCapitalize="none"
              autoCorrect={false}
              value={term}
              onChangeText={setTerm}
              inputStyle={{ color: "white" }}
            />
          </Spacer>
          <Spacer />
          <Button
            title={state.name}
            buttonStyle={{
              borderRadius: 35,
              height: 50,
              backgroundColor: "white"
            }}
            titleStyle={{ color: "black" }}
            onPress={() => {
              if (state.name == "Start Recording") {
                changeName("Stop");
                startRecording(term);
              } else {
                changeName("Start Recording");
                stopRecording();
              }
            }}
          />
          {!state.recording && state.location.length > 0 ? (
            <Button
              title="Save "
              buttonStyle={{
                marginTop: 25,
                borderRadius: 35,
                height: 50,
                backgroundColor: "white"
              }}
              titleStyle={{ color: "black" }}
              onPress={() => {
                saveTrack();
              }}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <Ionicons name="ios-add-circle" size={20} />
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 5,
    width: (4.5 * width) / 5,
    flex: 1,
    justifyContent: "center",
    marginBottom: 15
  }
});

export default withNavigationFocus(TrackCreateScreen);
