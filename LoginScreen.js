import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default LoginScreen = ({}) => {
  const navigation = useNavigation();
  const [id, setid] = useState("");

  const home = async () => {
    if (!id) {
      alert("Please enter your ID");
      return;
    } else if (/[^a-zA-Z0-9_]/.test(id)) {
      alert("ID can only contain letters, numbers, and underscores");
      return;
    }
    await AsyncStorage.setItem("id", id);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Note taking app!</Text>

      <TextInput
        placeholder="Enter your id"
        style={styles.input}
        onChangeText={(text) => setid(text)}
      />
      <Button color="#70b58d" title="Login" onPress={home} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
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
    textAlign: "center",
  },
});
