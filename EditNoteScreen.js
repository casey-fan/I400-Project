import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default EditNoteScreen = () => {
  const [editedNote, setEditedNote] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { note, notes, updateNotes } = route.params;

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const saveEditedNote = () => {
    if (editedNote) {
      const newNotes = notes.map((item) => (item === note ? editedNote : item));
      updateNotes(newNotes);
      navigation.navigate("Home", { updatedNotes: newNotes });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={editedNote}
        onChangeText={(text) => setEditedNote(text)}
        style={styles.editInput}
      />
      <Button color="#70b58d" title=" Save " onPress={saveEditedNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c2d3d8",
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
