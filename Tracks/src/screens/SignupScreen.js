import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, state } = useContext(Context);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.main}>
        <ImageBackground source={require("./images.jpeg")} style={styles.image}>
          <Text style={styles.text}>Trak Er</Text>
          <TouchableOpacity
            onPress={() => {
              console.log("Press");
              navigation.navigate("Signin");
            }}
          >
            <Text style={styles.nav}>
              Already have an Account ? Click here to sign in
            </Text>
          </TouchableOpacity>
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
            title="Sign Up"
            buttonStyle={{
              borderRadius: 35,
              height: 50,
              backgroundColor: "black"
            }}
            onPress={() => {
              signUp({ email, password });
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
// const styles = StyleSheet.create({
//   main: {
//     marginHorizontal: 8,
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     height: "80%"
//   },
//   text: {
//     marginBottom: 10,
//     alignSelf: "center"
//   },
//   image: {
//     width: "100%",
//     height: "85%",
//     borderWidth: 1,
//     borderRadius: 25
//   }
// });

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
    fontSize: 80
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
    top: 180,
    marginHorizontal: 80
  }
});

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

export default SignupScreen;
