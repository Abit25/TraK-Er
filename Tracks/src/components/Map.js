import React, { useContext } from "react";
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context } from "../context/LocationContext";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Map = () => {
  const {
    state: { location, currentLocation }
  } = useContext(Context);

  if (!currentLocation) {
    return (
      <ActivityIndicator
        size={30}
        style={{ justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <MapView
      height={height / 3}
      width={(4.8 * width) / 5}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle
        radius={30}
        center={{ ...currentLocation.coords }}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.3)"
      />
      <Polyline coordinates={location.map(loc => loc.coords)} />
    </MapView>
  );
};

export default Map;
