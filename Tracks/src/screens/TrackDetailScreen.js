import React, { useContext } from "react";
import { View, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import Spacer from "../components/Spacer";
const { width, height } = Dimensions.get("window");

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const id = navigation.getParam("id");
  const tracks = state.find(t => t._id === id);
  const init = tracks.location[0].coords;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(32,32,32)",
        alignItems: "center"
      }}
    >
      <Spacer />
      <Text h2 style={{ color: "white", fontFamily: "Copperplate" }}>
        {navigation.getParam("name")}
      </Text>
      <Spacer />
      <MapView
        height={height / 2}
        width={width}
        initialRegion={{
          longitudeDelta: 0.001,
          latitudeDelta: 0.001,
          latitude: init.latitude,
          longitude: init.longitude
        }}
      >
        <Polyline coordinates={tracks.location.map(loc => loc.coords)} />
      </MapView>
    </View>
  );
};

export default TrackDetailScreen;
