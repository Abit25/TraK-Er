import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Context } from "../context/AuthContext";

const Loading = () => {
  const { checkToken } = useContext(Context);
  useEffect(() => {
    checkToken();
  }, []);
  return null;
};

export default Loading;
