import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = ({ navigation}) => {
  const home = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Note taking app!</Text>
      <Button color="#70b58d" title="Home Screen" onPress={home} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2d3d8",
  },
});

