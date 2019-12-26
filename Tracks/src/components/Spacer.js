import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Spacer = ({ children }) => {
  return <View style={styles.space}>{children}</View>;
};

const styles = StyleSheet.create({
  space: {
    marginVertical: 10
  }
});

export default Spacer;
