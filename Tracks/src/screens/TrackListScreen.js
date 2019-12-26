import React, { useContext } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import { NavigationEvents } from "react-navigation";
import { ListItem, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <View>
      <NavigationEvents
        onWillFocus={() => {
          fetchTracks();
        }}
      />
      <FlatList
        data={state}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail", {
                  id: item._id,
                  name: item.name
                });
              }}
            >
              <ListItem chevron title={item.name} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
TrackListScreen.navigationOptions = {
  title: "My Tracks"
};

export default TrackListScreen;
