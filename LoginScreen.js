import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = ({ navigation}) => {
  const home = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Note taking app!</Text>

      <TextInput
        placeholder="Enter your email"
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your password"
        style={styles.input}
      />




      <Button color="#70b58d" title="Home Screen" onPress={home} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2d3d8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: "50%",
    padding: 10,
    backgroundColor: "white",
    textAlign:"center"
  },
});

