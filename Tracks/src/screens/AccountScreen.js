import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(32,32,32)",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ color: "white", fontSize: 40 }}>My Account</Text>
      <Button
        title="Logout"
        buttonStyle={{
          marginTop: 25,
          borderRadius: 35,
          height: 50,
          backgroundColor: "white",
          width: "100%",
          borderWidth: 5
        }}
        onPress={signOut}
        titleStyle={{ color: "black" }}
      />
    </View>
  );
};

AccountScreen.navigationOptions = {
  title: "Settings",
  tabBarIcon: <Ionicons name="ios-settings" size={25} />
};

export default AccountScreen;
