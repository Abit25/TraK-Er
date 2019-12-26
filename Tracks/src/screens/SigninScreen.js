import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { Context } from "../context/AuthContext";
import Spacer from "../components/Spacer";

const { width, height } = Dimensions.get("window");

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, state } = useContext(Context);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.main}>
        <ImageBackground
          source={require("../../water.jpeg")}
          style={styles.image}
        >
          <Text style={styles.text}>Trak Er</Text>
          {/* <Text style={styles.text}>
            Already have an Account ? Click here to sign in
          </Text> */}
        </ImageBackground>
        <View style={styles.form}>
          <Spacer>
            <Input
              label="Email"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </Spacer>
          <Spacer />
          <Spacer>
            <Input
              label="Password"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
          </Spacer>
          <Text style={styles.err}>{state.errMesg}</Text>
          <Spacer />
          <Button
            title="Sign In"
            buttonStyle={{
              borderRadius: 35,
              height: 50,
              backgroundColor: "black"
            }}
            onPress={() => {
              signIn({ email, password });
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flex: 1
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: 1,
    overflow: "hidden",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    marginHorizontal: 5,
    height: height / 3
  },
  text: {
    color: "white",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 80,
    justifyContent: "flex-start"
  },
  err: {
    color: "red",
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  nav: {
    position: "relative",
    color: "white",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 18,
    top: 200,
    marginHorizontal: 80
  }
});

SigninScreen.navigationOptions = () => {
  return {
    header: null
  };
};

export default SigninScreen;
