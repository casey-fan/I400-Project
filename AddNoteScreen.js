import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddNoteScreen = () => {
  const [note, setNote] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { notes, updateNotes } = route.params;

  const saveNote = () => {
    if (note) {
      const newNotes = notes ? [...notes, note] : [note];
      updateNotes(newNotes);
      navigation.navigate("Home", { updatedNotes: newNotes });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a new note"
        value={note}
        onChangeText={(text) => setNote(text)}
        style={styles.input}
      />
      <Button title="Save" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    padding: 10,
    marginBottom: 10,
  },
});

export default AddNoteScreen;
